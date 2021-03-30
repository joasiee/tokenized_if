import { utils } from "ethers";
import { OrgRegistry, Organization, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { dbConnect, getLogger } from "@tokenized_if/shared";
import { deployContract, getContract } from "../../blockchain-mgr";
import { orgregistry } from "../db/models";
import { updateDB, updateRegistry } from "../db/util";
import { config } from "../../config";
import { OrgRegistry as OrgRegistryContract } from "../../../dist/typechain/OrgRegistry";

const logger = getLogger("org-service");

export class OrganizationsService {
  async init() {
    await dbConnect(process.env.OMGR_DATABASE_USER, process.env.OMGR_DATABASE_PASSWORD, process.env.OMGR_DATABASE_NAME);
    await updateDB();
  }

  async getRegistry(registry: OrgRegistry): Promise<OrgRegistry> {
    logger.debug(`Checking if registry ${registry.getName()} exists.`);
    if (await orgregistry.db.exists({ name: registry.getName() })) {
      return Promise.resolve(orgregistry.fromModel(await orgregistry.db.findOne({ name: registry.getName() })));
    }
    const model = await orgregistry.db.create(registry.toObject());
    if (await updateRegistry(model)) {
      return orgregistry.fromModel(await orgregistry.db.findOne({ name: registry.getName() }));
    }
    return Promise.reject(`Registry with name ${registry.getName()} not in local db.`);
  }

  async deployRegistry(registry: OrgRegistry): Promise<OrgRegistry> {
    logger.debug(`Trying to deploy registry ${registry.getName()}`);
    try {
      const erc1820 = await deployContract(config.CONTRACTS.ERC_1820, []);
      const contract = await deployContract(config.CONTRACTS.ORG_REGISTRY, [erc1820.address]);
      registry.setAddress(contract.address);
      await orgregistry.db.create(registry.toObject());
      logger.debug(`Successfully deployed registry at: ${registry.getAddress()}`);
      return registry;
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  }

  async addOrganization(registry: OrgRegistry, org: Organization): Promise<OrgRegistry> {
    logger.debug(`Trying to add organization ${org.getName()} to registry ${registry.getName()}`);
    try {
      const model: orgregistry.IOrgRegistry = await orgregistry.db.findOne({ name: registry.getName() });
      let contract: OrgRegistryContract = getContract(
        registry.getAddress(),
        config.CONTRACTS.ORG_REGISTRY
      ) as OrgRegistryContract;
      if (model.orgsList.some((x) => x.name === org.getName())) {
        const msg = `Registry already contains org: ${org.getName()}`;
        logger.debug(msg);
        return;
      }
      await contract.registerOrg(
        org.getAddress(),
        utils.formatBytes32String(org.getName()),
        utils.toUtf8Bytes(org.getMsgurl()),
        utils.toUtf8Bytes(org.getMsgkey()),
        utils.toUtf8Bytes(org.getZkpkey()),
        utils.toUtf8Bytes("{}")
      );
      registry.getOrgsList().push(org);
      model.orgsList.push(org.toObject());
      await model.save();
      logger.debug(`Successfully added organization ${org.getName()} to registry.`);
      return registry;
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  }

  async addWorkgroup(registry: OrgRegistry, workgroup: Workgroup): Promise<OrgRegistry> {
    logger.debug(`Trying to add workgroup ${workgroup.getName()} to registry ${registry.getName()}`);
    try {
      const model: orgregistry.IOrgRegistry = await orgregistry.db.findOne({ name: registry.getName() });
      let contract: OrgRegistryContract = getContract(
        registry.getAddress(),
        config.CONTRACTS.ORG_REGISTRY
      ) as OrgRegistryContract;
      if (model.groupsList.some((x) => x.name === workgroup.getName())) {
        const msg = `Registry already contains group: ${workgroup.getName()}`;
        logger.debug(msg);
        return;
      }
      await contract.registerInterfaces(
        utils.formatBytes32String(workgroup.getName()),
        workgroup.getTokenaddress(),
        workgroup.getShieldaddress(),
        workgroup.getVerifieraddress()
      );
      registry.getGroupsList().push(workgroup);
      model.groupsList.push(workgroup.toObject());
      await model.save();
      logger.debug(`Successfully added group ${workgroup.getName()} to registry.`);
      return registry;
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  }
}
