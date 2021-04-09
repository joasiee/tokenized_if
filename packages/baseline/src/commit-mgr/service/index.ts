import { getLogger } from "@tokenized_if/shared";
import { Request, Response, Commitment } from "@tokenized_if/shared/src/proto/commit_pb";
import {
  checkChainLogs,
  get_ws_provider,
  jsonrpc,
  restartSubscriptions,
  subscribeMerkleEvents,
  unsubscribeMerkleEvents
} from "../blockchain";
import { merkleTrees } from "../db/models/MerkleTree";
import { getSiblingPathByLeafIndex, updateTree } from "../merkle-tree";
import { concatenateThenHash } from "../merkle-tree/hash";
import { getLeafByLeafIndex, getLeavesByLeafIndexRange } from "../merkle-tree/leaves";
import { txManagerServiceFactory } from "../tx-manager";

const logger = getLogger("commit-mgr");

export class CommitService {
  async init() {
    logger.debug("Initializing Commit service..");
    await get_ws_provider(); // Establish websocket connection
    await restartSubscriptions(); // Enable event listeners for active MerkleTrees
  }

  async shutdown() {
    get_ws_provider().destroy();
  }

  async getCommit(req: Request.Commit): Promise<Commitment> {
    const result = await getLeafByLeafIndex(req.getAddress(), req.getIndex());
    return modelToCommitment(result);
  }

  getCommits(req: Request.Commits): Response.Commitments {
    const endLeafIndex = req.getStartindex() + req.getCount() - 1;
    const result = getLeavesByLeafIndexRange(req.getAddress(), req.getStartindex(), endLeafIndex);
    return new Response.Commitments().setCommitmentsList(result.map(modelToCommitment));
  }

  async getRoot(req: Request.Root): Promise<Response.Root | Error> {
    try {
      const root = await updateTree(req.getAddress());
      return new Response.Root().setRoot(root.hash);
    } catch (err) {
      logger.error(err);
      return Error("Internal server error");
    }
  }

  async getProof(req: Request.Proof): Promise<Response.Commitments | Error> {
    try {
      const pathNodes = await getSiblingPathByLeafIndex(req.getAddress(), req.getLeafindex());
      return new Response.Commitments().setCommitmentsList(pathNodes.map(modelToCommitment));
    } catch (err) {
      logger.error(err);
      return Error("Internal server error");
    }
  }

  async getTracked(): Promise<Response.Tracked> {
    const trackedContracts = await merkleTrees
      .find({
        _id: { $regex: /_0$/ },
        active: true
      })
      .select("_id")
      .lean();
    const contractAddresses = [];
    for (const contract of trackedContracts) {
      const address = contract._id.slice(0, -2); // Cut off trailing "_0"
      contractAddresses.push(address);
    }
    return new Response.Tracked().setTrackedList(contractAddresses);
  }

  async verifyAndPush(req: Request.VerifyAndPush): Promise<Response.PushCommitment | Error> {
    const record = await merkleTrees
      .findOne({ _id: `${req.getAddress()}_0` })
      .select("shieldContract")
      .lean();
    if (!record) {
      logger.error(`[baseline_verifyAndPush] Merkle Tree not found in db: ${req.getAddress()}`);
      return Error("Internal server error");
    }
    logger.info(`[baseline_verifyAndPush] Found Shield/MerkleTree for contract address: ${req.getAddress()}`);
    const txManager = await txManagerServiceFactory(process.env.ETH_CLIENT_TYPE);
    try {
      const result = await txManager.insertLeaf(
        req.getAddress(),
        req.getSender(),
        req.getProofList(),
        req.getPublicinputsList(),
        req.getValue()
      );
      return new Response.PushCommitment().setTxhash(result.txHash);
    } catch (err) {
      logger.error(`[baseline_verifyAndPush] ${err}`);
      return Error("Internal server error");
    }
  }

  async track(req: Request.Track): Promise<Response.Bool | Error> {
    const merkleTree = await merkleTrees.findOne({ _id: `${req.getAddress()}_0` });
    if (merkleTree && merkleTree.active === true) {
      return Error("Internal server error");
    }
    const methodSignature = "0x01e3e915"; // function selector for "treeHeight()"
    const res = await jsonrpc("eth_call", [
      {
        to: req.getAddress(),
        data: methodSignature
      },
      "latest"
    ]);
    if (res.error) {
      logger.error(`[baseline_track] ${res.error}`);
      return Error("Internal server error");
    }
    const treeHeight = Number(res.result);
    if (!treeHeight) {
      logger.error(`[baseline_track] could not retrieve treeHeight`);
      return Error("Internal server error");
    }
    logger.info(`[baseline_track] found treeHeight of ${treeHeight} for contract ${req.getAddress()}`);
    await merkleTrees.findOneAndUpdate(
      { _id: `${req.getAddress()}_0` },
      {
        _id: `${req.getAddress()}_0`,
        treeHeight,
        active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await checkChainLogs(req.getAddress(), 0);
    subscribeMerkleEvents(req.getAddress());
    return new Response.Bool().setValue(true);
  }

  async untrack(req: Request.Untrack): Promise<Response.Bool | Error> {
    const prune = req.getPrune() || false;
    const foundTree = await merkleTrees
      .find({
        _id: { $regex: new RegExp(req.getAddress()) }
      })
      .select("_id")
      .lean();
    if (foundTree.length === 0) {
      logger.error(`[baseline_untrack] Merkle Tree not found in db: ${req.getAddress()}`);
      return Error("Internal server error");
    }
    unsubscribeMerkleEvents(req.getAddress());

    // If prune === true, wipe tree from storage
    if (prune === true) {
      await merkleTrees.deleteMany({
        _id: { $regex: new RegExp(req.getAddress()) }
      });
    } else {
      await merkleTrees.updateOne({ _id: `${req.getAddress()}_0` }, { active: false }, { upsert: true, new: true });
    }
    return new Response.Bool().setValue(true);
  }

  async verify(req: Request.Verify): Promise<Response.Bool> {
    const siblingNodes = req.getSiblingpathList();
    const root = siblingNodes[siblingNodes.length - 1].getValue();
    const updatedRoot = await updateTree(req.getAddress());
    let currentHash = req.getCommit();
    for (let index = 0; index < siblingNodes.length - 1; index++) {
      if (siblingNodes[index].getNumber() % 2 === 0) {
        // even nodeIndex
        currentHash = concatenateThenHash(currentHash, siblingNodes[index].getValue());
      } else {
        // odd nodeIndex
        currentHash = concatenateThenHash(siblingNodes[index].getValue(), currentHash);
      }
    }
    const result = root === currentHash && root === updatedRoot;
    return new Response.Bool().setValue(result);
  }
}

function modelToCommitment(model) {
  return new Commitment().setNumber(model.leafIndex).setValue(model.hash);
}
