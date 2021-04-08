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

chai.use(chaiMatch);

describe("Integration", function() {
  let commitMgr: CommitService;
  let orgMgr: OrganizationsService;
  let zkpMgr: ZKPService;

  before(async function() {
    await dbConnect(process.env.MONGO_DB_NAME);
    await clearDBs();
    commitMgr = new CommitService();
    orgMgr = new OrganizationsService();
    zkpMgr = new ZKPService();
    await commitMgr.init();
    await orgMgr.init();
    await zkpMgr.init();
  });

  describe("Setting up workgroup", function() {
    let verifierAddress: string;
    const registry = new OrgRegistry().setName("IF Financing");
    const noopCircuit = "noopTest";
    const workgroupName = "Shipments WMS";

    it("should deploy orgregistry", async function() {
      const result = await orgMgr.deployRegistry(registry);
      expect(result.getAddress()).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("should compile noop zkp circuit", async function() {
      const result = await zkpMgr.compileCircuit(noopCircuit);
      const filepath = path.join(config.APP_ROOT, "dist", "artifacts", noopCircuit + ".json");
      expect(result).to.eq(null);
      expect(existsSync(filepath)).to.be.true;
    });

    it("should deploy compiled circuit to blockchain", async function() {
      const result = await zkpMgr.deployCircuit(noopCircuit);
      verifierAddress = (await zkpMgr.getCircuit(noopCircuit)).address;
      expect(result).to.eq(null);
      expect(verifierAddress).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("should add workgroup using compiled circuit to registry", async function() {
      const req = new Workgroup()
        .setName(workgroupName)
        .setVerifieraddress(verifierAddress)
        // set token address, otherwise contract will throw error (can be used to track token registry address for workgroup)
        .setTokenaddress(verifierAddress);
      const res = await orgMgr.addWorkgroup(registry, req);
      expect(res.getGroupsList().length).to.eq(1);
    });
  });

  after(function() {
    orgMgr.shutdown();
    commitMgr.shutdown();
    dbClose();
  });
});
