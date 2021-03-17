import dotenv from "dotenv";

import { logger } from "./logger";
import { dbConnect } from "./db";
import { get_ws_provider, restartSubscriptions } from "./blockchain";
import {
  checkChainLogs,
  subscribeMerkleEvents,
  jsonrpc,
  unsubscribeMerkleEvents,
} from "./blockchain";
import { merkleTrees } from "./db/models/MerkleTree";
import { updateTree, getSiblingPathByLeafIndex } from "./merkle-tree";
import {
  getLeafByLeafIndex,
  getLeavesByLeafIndexRange,
} from "./merkle-tree/leaves.js";
import { concatenateThenHash } from "./merkle-tree/hash.js";
import { txManagerServiceFactory } from "./tx-manager";

export class CommitManager {
  constructor() {
    this.init();
  }

  getCommit(address: string, index: number): any {
    return getLeafByLeafIndex(address, index);
  }

  getCommits(address: string, startIndex: number, count: number): any[] {
    if (count < 1) {
      logger.error("[baseline_getCommits] Count must be greater than 0");
      return;
    }
    const endLeafIndex = startIndex + count - 1;
    return getLeavesByLeafIndexRange(address, startIndex, endLeafIndex);
  }

  getRoot(address: string): any {
    let root;
    try {
      root = updateTree(address);
    } catch (err) {
      logger.error(`[baseline_getRoot] ${err}`);
      return;
    }
    return root;
  }

  getProof(address: string, leafIndex: number): any {
    let pathNodes;
    try {
      pathNodes = getSiblingPathByLeafIndex(address, leafIndex);
    } catch (err) {
      logger.error(`[baseline_getProof] ${err}`);
      return;
    }
    return pathNodes;
  }

  async getTracked(): Promise<string[]> {
    const trackedContracts = await merkleTrees
      .find({
        _id: { $regex: /_0$/ },
        active: true,
      })
      .select("_id")
      .lean();
    const contractAddresses = [];
    for (const contract of trackedContracts) {
      const address = contract._id.slice(0, -2); // Cut off trailing "_0"
      contractAddresses.push(address);
    }
    logger.info(`Found ${contractAddresses.length} tracked contracts`);
    return contractAddresses;
  }

  async track(address: string): Promise<boolean> {
    const merkleTree = await merkleTrees.findOne({ _id: `${address}_0` });
    if (merkleTree && merkleTree.active === true) {
      logger.info(`[baseline_track] Already tracking ${address}`);
      return false;
    }

    const methodSignature = "0x01e3e915"; // function selector for "treeHeight()"
    const res = await jsonrpc("eth_call", [
      {
        to: address,
        data: methodSignature,
      },
      "latest",
    ]);
    if (res.error) {
      logger.error(`[baseline_track] ${res.error}`);
      return res.result;
    }
    const treeHeight = Number(res.result);
    if (!treeHeight) {
      logger.error(
        "[baseline_track] Could not retreive treeHeight from blockchain"
      );
      return false;
    }
    logger.info(
      `[baseline_track] found treeHeight of ${treeHeight} for contract ${address}`
    );

    await merkleTrees.findOneAndUpdate(
      { _id: `${address}_0` },
      {
        _id: `${address}_0`,
        treeHeight,
        active: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await checkChainLogs(address, 0);
    subscribeMerkleEvents(address);
    return true;
  }

  async untrack(address: string, prune?: boolean): Promise<boolean> {
    const foundTree = await merkleTrees
      .find({
        _id: { $regex: new RegExp(address) },
      })
      .select("_id")
      .lean();

    if (foundTree.length === 0) {
      logger.error(
        `[baseline_untrack] Merkle Tree not found in db: ${address}`
      );
      return false;
    }

    unsubscribeMerkleEvents(address);

    // If prune === true, wipe tree from storage
    if (prune === true) {
      await merkleTrees.deleteMany({ _id: { $regex: new RegExp(address) } });
    } else {
      await merkleTrees.updateOne(
        { _id: `${address}_0` },
        { active: false },
        { upsert: true, new: true }
      );
    }

    return true;
  }

  async verify(
    address: string,
    value: string,
    siblings: any[]
  ): Promise<boolean> {
    const root = siblings[siblings.length - 1].hash;
    const updatedRoot = await updateTree(address);
    let currentHash = value;

    for (let index = 0; index < siblings.length - 1; index++) {
      if (siblings[index].nodeIndex % 2 === 0) {
        // even nodeIndex
        currentHash = concatenateThenHash(currentHash, siblings[index].hash);
      } else {
        // odd nodeIndex
        currentHash = concatenateThenHash(siblings[index].hash, currentHash);
      }
    }
    return root === currentHash && root === updatedRoot;
  }

  async verifyAndPush(
    sender: string,
    address: string,
    proof: number[],
    publicInputs: string[],
    value: string
  ): Promise<any> {
    const record = await merkleTrees
      .findOne({ _id: `${address}_0` })
      .select("shieldContract")
      .lean();
    if (!record) {
      logger.error(
        `[baseline_verifyAndPush] Merkle Tree not found in db: ${address}`
      );
      return null;
    }
    logger.info(
      `[baseline_verifyAndPush] Found Shield/MerkleTree for contract address: ${address}`
    );

    const txManager = await txManagerServiceFactory(
      process.env.CMGR_ETH_CLIENT_TYPE
    );

    let result;
    try {
      result = await txManager.insertLeaf(
        address,
        sender,
        proof,
        publicInputs,
        value
      );
    } catch (err) {
      logger.error(`[baseline_verifyAndPush] ${err}`);
      return null;
    }
    logger.info(`[baseline_verifyAndPush] txHash: ${result.txHash}`);
    return { txHash: result.txHash };
  }

  async init() {
    dotenv.config();
    const port = process.env.CMGR_SERVER_PORT;

    logger.info("Starting commmitment manager server...");

    const dbUrl =
      "mongodb://" +
      `${process.env.CMGR_DATABASE_USER}` +
      ":" +
      `${process.env.CMGR_DATABASE_PASSWORD}` +
      "@" +
      `${process.env.CMGR_DATABASE_HOST}` +
      "/" +
      `${process.env.CMGR_DATABASE_NAME}`;

    logger.debug(
      `Attempting to connect to db: ${process.env.CMGR_DATABASE_HOST}/${process.env.CMGR_DATABASE_NAME}`
    );

    await dbConnect(dbUrl);
    await get_ws_provider(); // Establish websocket connection
    await restartSubscriptions(); // Enable event listeners for active MerkleTrees
  }
}
