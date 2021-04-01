import chai, { expect } from "chai";
import chaiExclude from "chai-exclude";
import { describe, it } from "mocha";
import { OrgRegistry, Organization, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { dbConnect, dbClose } from "@tokenized_if/shared";
import { workgroup, organization, orgregistry } from "../src/organization-mgr/db/models";
import { IOrgRegistry } from "../src/organization-mgr/db/models/orgregistry";

chai.use(chaiExclude);

describe("Organization Manager", function () {
  // helper functions
  const getWorkgroup = function (name: string, addresses: string[]) {
    return new Workgroup()
      .setName(name)
      .setShieldaddress(addresses[0])
      .setTokenaddress(addresses[1])
      .setVerifieraddress(addresses[2])
      .setWorkstep(0);
  };
  const getOrganization = function (name: string, address: string, keys: string[]) {
    return new Organization()
      .setName(name)
      .setAddress(address)
      .setMsgkey(keys[0])
      .setMsgurl(keys[1])
      .setZkpkey(keys[2]);
  };
  const getRegistry = function (name: string, address: string, orgs: Organization[], groups: Workgroup[]) {
    return new OrgRegistry().setName(name).setAddress(address).setOrgsList(orgs).setGroupsList(groups);
  };

  // init db
  before(async function () {
    await dbConnect(process.env.OMGR_DATABASE_USER, process.env.OMGR_DATABASE_PASSWORD, process.env.OMGR_DATABASE_NAME);
  });

  // test mongoose models
  describe("Mongoose models", function () {
    const addRegistryDefault = async function () {
      const orgs = [];
      orgs.push(getOrganization("org1", "addr1", ["key1", "key2", "key3"]));
      orgs.push(getOrganization("org2", "addr2", ["key1", "key2", "key3"]));
      const groups = [];
      groups.push(getWorkgroup("group1", ["addr1", "addr2", "addr3"]));
      groups.push(getWorkgroup("group2", ["addr1", "addr2", "addr3"]));
      const registry = getRegistry("Registry", "address", orgs, groups);
      await orgregistry.db.create(registry.toObject());
      return registry;
    };
    describe("adding protobuf objects to db", function () {
      beforeEach(async function () {
        await orgregistry.db.deleteMany(); //clear db before each test
      });
      it("should add registry with no groups or orgs", async function () {
        const registry = getRegistry("Registry", "address", [], []);
        await orgregistry.db.create(registry.toObject());
        const model = await orgregistry.db.findOne({ name: registry.getName() });
        expect(model.toObject()).excluding(["__v", "_id"]).to.deep.eq(registry.toObject());
      });
      it("should add registry with orgs and groups", async function () {
        const registry = await addRegistryDefault();
        const model = await orgregistry.db.findOne({ name: registry.getName() });
        expect(model.toObject()).excludingEvery(["__v", "_id"]).to.deep.eq(registry.toObject());
      });
      it("should contruct protobuf from model", async function () {
        const registry = await addRegistryDefault();
        const model = await orgregistry.db.findOne({ name: registry.getName() });
        expect(orgregistry.fromModel(model)).to.deep.eq(registry);
      });
    });
  });

  // close db connection.
  after(function () {
    dbClose();
  });
});
