import { utils } from "ethers";
import { OrgRegistry, Organization, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { dbConnect, getLogger, dbClose } from "@tokenized_if/shared";
import { deployContract, getContract } from "../../blockchain-mgr";
import { orgregistry } from "../db";
import { DBSync } from "./dbsync";
import { config } from "../../config";
import { OrgRegistry as OrgRegistryContract } from "../../../dist/typechain/OrgRegistry";

const logger = getLogger("org-service");

/**
 * Service for {@link OrganizationsServer}.
 */
export class OrganizationsService {
  private dbsync: DBSync = new DBSync();

  /**
   * Connect to local mongodb, update previously stored registries.
   */
  async init() {
    await dbConnect(process.env.OMGR_DATABASE_USER, process.env.OMGR_DATABASE_PASSWORD, process.env.OMGR_DATABASE_NAME);
    await this.dbsync.updateDB();
  }

  /**
   * Shutdown service.
   */
  shutdown() {
    this.dbsync.shutdown();
    dbClose();
  }

  /**
   * GetS a registry.
   * First checks if it is available in local db, if not checks on chain at address.
   * @param registry
   * @returns
   */
  async getRegistry(registry: OrgRegistry): Promise<OrgRegistry> {
    logger.debug(`Checking if registry ${registry.getName()} exists.`);
    if (await orgregistry.db.exists({ name: registry.getName() })) {
      return orgregistry.fromModel(await orgregistry.db.findOne({ name: registry.getName() }));
    }
    const model = await orgregistry.db.create(registry.toObject());
    if (await this.dbsync.updateRegistry(model)) {
      return orgregistry.fromModel(await orgregistry.db.findOne({ name: registry.getName() }));
    }
    return Promise.reject(`Registry with name ${registry.getName()} not in local db.`);
  }

  /**
   * Deploys registry.
   * First deploys erc1820 (dev), then deploys orgregistry using address of deployed erc1820.
   * Also saves deployed registry locally.
   * @param registry
   * @returns
   */
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
      return Promise.reject(err);
    }
  }

  /**
   * Adds organization to specific registry.
   * @param registry registry to add org to
   * @param org org to add
   * @returns updated registry
   */
  async addOrganization(registry: OrgRegistry, org: Organization): Promise<OrgRegistry> {
    logger.debug(`Trying to add organization ${org.getName()} to registry ${registry.getName()}`);
    try {
      const model: orgregistry.IOrgRegistry = await orgregistry.db.findOne({ name: registry.getName() });
      let contract: OrgRegistryContract = (await getContract(
        registry.getAddress(),
        config.CONTRACTS.ORG_REGISTRY
      )) as OrgRegistryContract;
      // do not add if org is already added locally.
      if (model.orgsList.some((x) => x.name === org.getName())) {
        const msg = `Registry already contains org: ${org.getName()}`;
        logger.debug(msg);
        return;
      }
      // contract interaction
      await contract.registerOrg(
        org.getAddress(),
        utils.formatBytes32String(org.getName()),
        utils.toUtf8Bytes(org.getMsgurl()),
        utils.toUtf8Bytes(org.getMsgkey()),
        utils.toUtf8Bytes(org.getZkpkey()),
        utils.toUtf8Bytes("{}")
      );
      // update locally
      registry.getOrgsList().push(org);
      model.orgsList.push(org.toObject());
      await model.save();
      logger.debug(`Successfully added organization ${org.getName()} to registry.`);
      return registry;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Adds workgroup to registry.
   * @param registry registry to add workgroup to
   * @param workgroup workgroup to add
   * @returns
   */
  async addWorkgroup(registry: OrgRegistry, workgroup: Workgroup): Promise<OrgRegistry> {
    logger.debug(`Trying to add workgroup ${workgroup.getName()} to registry ${registry.getName()}`);
    try {
      const model: orgregistry.IOrgRegistry = await orgregistry.db.findOne({ name: registry.getName() });
      let contract: OrgRegistryContract = (await getContract(
        registry.getAddress(),
        config.CONTRACTS.ORG_REGISTRY
      )) as OrgRegistryContract;
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
      return Promise.reject(err);
    }
  }
}
