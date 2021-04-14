import { dbClose, dbConnect } from "@tokenized_if/shared";
import { OrgRegistry, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { existsSync } from "fs";
import path from "path";
import chai, { expect } from "chai";
import chaiMatch from "chai-match";
import { after, describe, it } from "mocha";
import { CommitService } from "../src/commit-mgr/service";
import { OrganizationsService } from "../src/organization-mgr/service";
import { ZKPService } from "../src/zkp-mgr/service";
import { clearDBs } from "./util";
import { config } from "../src/config";
import { sha256 } from "@tokenized_if/shared";
import { Proof } from "@tokenized_if/shared/src/proto/zkp_pb";
import { Request, Response, Commitment } from "@tokenized_if/shared/src/proto/commit_pb";

chai.use(chaiMatch);

const shipmentArgs = function() {
  const billOfLading = {
    id: 5,
    from: "Bob",
    to: "Alice",
    items: ["peanuts", "chocolate", "detergent"]
  };
  const billHash = sha256(Buffer.from(JSON.stringify(billOfLading)));
  const pkImporter = sha256(Buffer.from("Importer"));
  const commitHash = sha256(Buffer.from(pkImporter + billHash, "hex"));
  return [
    [BigInt("0x" + commitHash.substring(0, 32)).toString(10), BigInt("0x" + commitHash.substring(32, 64)).toString(10)],
    [BigInt("0x" + pkImporter.substring(0, 32)).toString(10), BigInt("0x" + pkImporter.substring(32, 64)).toString(10)],
    [BigInt("0x" + billHash.substring(0, 32)).toString(10), BigInt("0x" + billHash.substring(32, 64)).toString(10)]
  ];
};

describe("Integration", function() {
  let commitMgr: CommitService;
  let orgMgr: OrganizationsService;
  let zkpMgr: ZKPService;

  let registry = new OrgRegistry().setName("IF Financing");

  before(async function() {
    await dbConnect(process.env.MONGO_DB_NAME);
    await clearDBs();
    commitMgr = new CommitService();
    orgMgr = new OrganizationsService();
    zkpMgr = new ZKPService();
    await commitMgr.init();
    await orgMgr.init();
    await zkpMgr.init();
    await orgMgr.deployRegistry(registry);
  });

  function testCircuit(circuitName: string, workgroupName: string, proofInputs: any[], commitHash: string) {
    describe("Testing circuit: " + circuitName, function() {
      let verifierAddress: string;
      let shieldAddress: string;
      describe("Setting up workgroup", function() {
        it("should compile noop zkp circuit", async function() {
          const result = await zkpMgr.compileCircuit(circuitName);
          const filepath = path.join(config.APP_ROOT, "dist", "artifacts", circuitName + ".json");
          expect(result).to.eq(null);
          expect(existsSync(filepath)).to.be.true;
        });

        it("should deploy compiled circuit to blockchain", async function() {
          const result = await zkpMgr.deployCircuit(circuitName);
          verifierAddress = (await zkpMgr.getCircuit(circuitName)).address;
          expect(result).to.eq(null);
          expect(verifierAddress).to.match(/^0x[a-fA-F0-9]{40}$/);
        });

        it("should add workgroup using compiled circuit to registry", async function() {
          const req = new Workgroup()
            .setName(workgroupName)
            .setVerifieraddress(verifierAddress)
            // set token address, otherwise contract will throw error (can be used to track token registry address for workgroup)
            .setTokenaddress(verifierAddress);
          registry = await orgMgr.addWorkgroup(registry, req);
          expect(registry.getGroupsList().length).to.eq(1);
          shieldAddress = registry.getGroupsList()[0].getShieldaddress();
        });

        it("should start tracking shield contract", async function() {
          const req = new Request.Track().setAddress(shieldAddress);
          const res = await commitMgr.track(req);
          expect(res instanceof Error).to.be.false;
        });
      });

      describe("Generating proof, inserting + verifying onchain", function() {
        let proof: Proof;

        it("zkp service should generate proof", async function() {
          const result = await zkpMgr.generateProof(circuitName, proofInputs);
          expect(result instanceof Error).to.be.false;
          proof = result as Proof;
        });

        it("should push proof to shield contract", async function() {
          const req = new Request.VerifyAndPush()
            .setSender(verifierAddress)
            .setAddress(shieldAddress)
            .setProof(proof)
            .setValue(commitHash);
          let result = await commitMgr.verifyAndPush(req);
          expect(result instanceof Error).to.be.false;
          expect((result as Response.PushCommitment).getCommitment().getValue()).to.eq(commitHash);
        });

        let root: string;

        it("should get root from commit manager", async function() {
          const req = new Request.Root().setAddress(shieldAddress);
          const res = await commitMgr.getRoot(req);
          expect(res instanceof Error).to.be.false;
          root = (res as Response.Root).getRoot();
        });

        let siblingPath: Commitment[];

        it("should get proof from commit manager", async function() {
          const req = new Request.Proof().setAddress(shieldAddress).setLeafindex(0);
          let res = await commitMgr.getProof(req);
          expect(res instanceof Error).to.be.false;
          res = res as Response.Commitments;
          expect(res.getCommitmentsList().length).to.eq(config.TREE_HEIGHT + 1);
          expect(res.getCommitmentsList()[res.getCommitmentsList().length - 1].getValue()).to.eq(root);
          siblingPath = res.getCommitmentsList();
        });

        it("should verify proof using commit manager", async function() {
          const req = new Request.Verify()
            .setAddress(shieldAddress)
            .setCommit(commitHash)
            .setRoot(root)
            .setSiblingpathList(siblingPath);
          const res = await commitMgr.verify(req);
          expect(res.getValue()).to.be.true;
        });
      });
    });
  }

  testCircuit("noopTest", "noop", ["5"], sha256(Buffer.from("noop commit")));
  // testCircuit("addShipment", "noop group", shipmentArgs(), shipmentArgs()[0][0] + shipmentArgs()[0][1]);

  after(async function() {
    orgMgr.shutdown();
    await commitMgr.shutdown();
    await clearDBs();
    dbClose();
  });
});
