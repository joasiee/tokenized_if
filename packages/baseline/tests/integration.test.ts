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
import { Request } from "@tokenized_if/shared/src/proto/commit_pb";

chai.use(chaiMatch);

describe("Integration", function () {
  let commitMgr: CommitService;
  let orgMgr: OrganizationsService;
  let zkpMgr: ZKPService;

  let registry = new OrgRegistry().setName("IF Financing");
  let verifierAddress: string;
  let shieldAddress: string;
  const noopCircuit = "noopTest";
  const workgroupName = "Shipments WMS";

  before(async function () {
    await dbConnect(process.env.MONGO_DB_NAME);
    await clearDBs();
    commitMgr = new CommitService();
    orgMgr = new OrganizationsService();
    zkpMgr = new ZKPService();
    await commitMgr.init();
    await orgMgr.init();
    await zkpMgr.init();
  });

  describe("Setting up workgroup", function () {
    it("should deploy orgregistry", async function () {
      const result = await orgMgr.deployRegistry(registry);
      expect(result.getAddress()).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("should compile noop zkp circuit", async function () {
      const result = await zkpMgr.compileCircuit(noopCircuit);
      const filepath = path.join(config.APP_ROOT, "dist", "artifacts", noopCircuit + ".json");
      expect(result).to.eq(null);
      expect(existsSync(filepath)).to.be.true;
    });

    it("should deploy compiled circuit to blockchain", async function () {
      const result = await zkpMgr.deployCircuit(noopCircuit);
      verifierAddress = (await zkpMgr.getCircuit(noopCircuit)).address;
      expect(result).to.eq(null);
      expect(verifierAddress).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("should add workgroup using compiled circuit to registry", async function () {
      const req = new Workgroup()
        .setName(workgroupName)
        .setVerifieraddress(verifierAddress)
        // set token address, otherwise contract will throw error (can be used to track token registry address for workgroup)
        .setTokenaddress(verifierAddress);
      registry = await orgMgr.addWorkgroup(registry, req);
      expect(registry.getGroupsList().length).to.eq(1);
      shieldAddress = registry.getGroupsList()[0].getShieldaddress();
    });

    it("should start tracking shield contract", async function () {
      const req = new Request.Track().setAddress(shieldAddress);
      const res = await commitMgr.track(req);
      expect(res instanceof Error).to.be.false;
    });
  });

  describe("Inserting proof to onchain merkle tree", function () {
    let proof: Proof;

    it("zkp service should generate proof", async function () {
      const result = await zkpMgr.generateProof(noopCircuit, ["5"]);
      expect(result instanceof Error).to.be.false;
      proof = result as Proof;
    });

    it("should push proof to shield contract", async function () {
      const commitHash = sha256(Buffer.from("random commit hash"));
      const req = new Request.VerifyAndPush()
        .setSender(verifierAddress)
        .setAddress(shieldAddress)
        .setProof(proof)
        .setValue(commitHash);
      let result = await commitMgr.verifyAndPush(req);
      expect(result instanceof Error).to.be.false;
    });
  });

  after(async function () {
    orgMgr.shutdown();
    await commitMgr.shutdown();
    await clearDBs();
    dbClose();
  });
});
