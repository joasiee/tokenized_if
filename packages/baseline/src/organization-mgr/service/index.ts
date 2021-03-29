import { utils } from "ethers";
import { OrgRegistry, Organization } from "@tokenized_if/shared/src/proto/organizations_pb";
import { dbConnect, getLogger } from "@tokenized_if/shared";
import { deployContract, getContract } from "../../blockchain-mgr";
import { orgregistry } from "../models";
import { config } from "../../config";
import { OrgRegistry as OrgRegistryContract } from "../../../dist/typechain/OrgRegistry";

const logger = getLogger("org-service");

export class OrganizationsService {
  constructor() {
    dbConnect(process.env.OMGR_DATABASE_USER, process.env.OMGR_DATABASE_PASSWORD, process.env.OMGR_DATABASE_NAME);
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
    }
  }

  async addOrganization(registry: OrgRegistry, org: Organization): Promise<OrgRegistry> {
    logger.debug(`Trying to add organization ${org.getName()} to registry ${registry.getName()}`);
    try {
      const model: orgregistry.IOrgRegistry = await orgregistry.db.findOne({ address: registry.getAddress() });
      let contract: OrgRegistryContract;
      contract = getContract(registry.getAddress(), config.CONTRACTS.ORG_REGISTRY) as OrgRegistryContract;
      if (model.orgsList.includes(org.toObject())) {
        const msg = `Registry already contains org: ${org.getName()}`;
        logger.debug(msg);
        return;
      }
      await contract.registerOrg(
        org.getAddress(),
        utils.formatBytes32String(org.getName()),
        utils.toUtf8Bytes(org.getMsgurl()),
        utils.hexlify(org.getMsgkey()),
        utils.hexlify(org.getZkpkey()),
        utils.toUtf8Bytes("{}")
      );
      registry.getOrgsList().push(org);
      model.orgsList.push(org.toObject());
      await model.save();
      logger.debug(`Successfully added to registry.`);
      return registry;
    } catch (err) {
      logger.error(err);
    }
  }
}
