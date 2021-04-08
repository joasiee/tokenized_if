import chai, { expect } from "chai";
import chaiExclude from "chai-exclude";
import { after, describe, it } from "mocha";
import { OrgRegistry, Organization, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { orgregistry } from "../src/organization-mgr/db";
import { OrganizationsService } from "../src/organization-mgr/service";
import { dbConnect, dbClose } from "@tokenized_if/shared";

chai.use(chaiExclude);
const ethAddress = "0xfe36dee625234eaedbade27c15405eb482b81f1d";

// helper functions
const getWorkgroup = function(name: string, addresses: string[]) {
  return new Workgroup()
    .setName(name)
    .setShieldaddress(addresses[0])
    .setTokenaddress(addresses[1])
    .setVerifieraddress(addresses[2])
    .setWorkstep(0);
};

const getOrganization = function(name: string, address: string, keys: string[]) {
  return new Organization()
    .setName(name)
    .setAddress(address)
    .setMsgkey(keys[0])
    .setMsgurl(keys[1])
    .setZkpkey(keys[2]);
};

const getRegistry = function(name: string, address: string, orgs: Organization[], groups: Workgroup[]) {
  return new OrgRegistry()
    .setName(name)
    .setAddress(address)
    .setOrgsList(orgs)
    .setGroupsList(groups);
};

const getDefaultRegistry = function() {
  const orgs = [];
  orgs.push(getOrganization("org1", "addr1", ["key1", "key2", "key3"]));
  orgs.push(getOrganization("org2", "addr2", ["key1", "key2", "key3"]));
  const groups = [];
  groups.push(getWorkgroup("group1", ["addr1", "addr2", "addr3"]));
  groups.push(getWorkgroup("group2", ["addr1", "addr2", "addr3"]));
  return getRegistry("Registry", "address", orgs, groups);
};

describe("Organization Manager", function() {
  let service: OrganizationsService;
  before(async function() {
    await dbConnect(process.env.MONGO_DB_NAME);
    service = new OrganizationsService();
    await service.init();
  });

  // test mongoose models
  describe("Mongoose models", function() {
    const addRegistryDefault = async function() {
      const registry = getDefaultRegistry();
      await orgregistry.db.create(registry.toObject());
      return registry;
    };

    afterEach(async function() {
      await orgregistry.db.deleteMany(); //clear db before each test
    });

    it("should add registry with no groups or orgs", async function() {
      const registry = getRegistry("Registry", "address", [], []);
      await orgregistry.db.create(registry.toObject());
      const model = await orgregistry.db.findOne({ name: registry.getName() });
      expect(model.toObject())
        .excluding(["__v", "_id"])
        .to.deep.eq(registry.toObject());
    });

    it("should add registry with orgs and groups", async function() {
      const registry = await addRegistryDefault();
      const model = await orgregistry.db.findOne({ name: registry.getName() });
      expect(model.toObject())
        .excludingEvery(["__v", "_id"])
        .to.deep.eq(registry.toObject());
    });

    it("should contruct protobuf from model", async function() {
      const registry = await addRegistryDefault();
      const model = await orgregistry.db.findOne({ name: registry.getName() });
      expect(orgregistry.fromModel(model)).to.deep.eq(registry);
    });
  });

  describe("Organization service", function() {
    const req = new OrgRegistry().setName("Registry");
    let org: Organization;
    let group: Workgroup;

    it("should deploy registry", async function() {
      const registry = await service.deployRegistry(req);
      expect(registry.getAddress()).to.not.eq("");
      expect(registry.getAddress()).to.not.eq(undefined);
      expect(registry.getAddress()).to.not.eq(null);
    });

    it("should add organization to deployed registry", async function() {
      org = getOrganization("Org", ethAddress, ["key1", "key2", "key3"]);
      const registry = await service.addOrganization(req, org);
      expect(registry.getOrgsList().length).to.eq(1);
      expect(registry.getOrgsList()[0].toObject()).to.deep.eq(org.toObject());
    });

    it("should add workgroup to deployed registry", async function() {
      group = getWorkgroup("Group", [ethAddress, ethAddress, ethAddress]);
      const registry = await service.addWorkgroup(req, group);
      expect(registry.getGroupsList().length).to.eq(1);
      expect(registry.getGroupsList()[0].toObject())
        .excludingEvery("shieldaddress")
        .to.deep.eq(group.toObject());
    });

    it("should refresh from on chain data correctly", async function() {
      // clear orgs and groups from local registry entry
      await orgregistry.db.findOneAndUpdate({ name: req.getName() }, { orgsList: [], groupsList: [] });
      await service.init(); //re-init from onchain data.
      const registry = await service.getRegistry(req);
      expect(registry.getOrgsList().length).to.eq(1);
      expect(registry.getOrgsList()[0].toObject()).to.deep.eq(org.toObject());
      expect(registry.getGroupsList().length).to.eq(1);
      expect(registry.getGroupsList()[0].toObject())
        .excludingEvery("shieldaddress")
        .to.deep.eq(group.toObject());
    });
  });

  after(async function() {
    service.shutdown();
    dbClose();
  });
});
