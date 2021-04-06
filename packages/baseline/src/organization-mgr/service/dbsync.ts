import { getContract, isDeployed } from "../../blockchain-mgr";
import { orgregistry, organization, workgroup } from "../db";
import { config } from "../../config";
import { getLogger } from "@tokenized_if/shared";
import { OrgRegistry as OrgRegistryContract } from "dist/typechain/OrgRegistry";
import { Organization, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";
import { Contract } from "ethers";

const logger = getLogger("org-service");

export class DBSync {
  private contracts: Contract[] = [];

  shutdown() {
    for (let contract of this.contracts) {
      contract.removeAllListeners();
    }
    this.contracts = [];
  }

  /**
   * Updates local db, by checking registries deployed on-chain.
   */
  async updateDB() {
    const registries = await orgregistry.db.find();
    for (const registry of registries) {
      await this.updateRegistry(registry);
    }
  }

  /**
   * Checks if registry is deployed.
   * If so retrieves the organizations and workgroups, registers callbacks.
   * @param registry local registry
   * @returns true if deployed, false if not
   */
  async updateRegistry(registry: orgregistry.IOrgRegistry): Promise<boolean> {
    if (!(await isDeployed(registry.address))) {
      await registry.deleteOne();
      return false;
    }
    const contract: OrgRegistryContract = (await getContract(
      registry.address,
      config.CONTRACTS.ORG_REGISTRY
    )) as OrgRegistryContract;
    registry.orgsList = await this.getOrgs(contract);
    registry.groupsList = await this.getGroups(contract);
    await registry.save();
    await this.registerCallbacks(registry);
    return true;
  }

  /**
   * Gets organizations from deployed contract.
   * @param contract
   * @returns array containing orgs, using mongoose defined schema
   */
  async getOrgs(contract: OrgRegistryContract): Promise<Organization.AsObject[]> {
    const orgs = [];
    const orgCount = await contract.getOrgCount();
    for (let i = 0; orgCount.gt(i); i++) {
      orgs.push(await contract.orgs(i));
    }
    return orgs.map(function (org) {
      return organization.fromContract(org).toObject();
    });
  }

  /**
   * Gets groups from deployed contract.
   * @param contract
   * @returns array containing groups, using mongoose defined schema
   */
  async getGroups(contract: OrgRegistryContract): Promise<Workgroup.AsObject[]> {
    const groups = await contract.getInterfaceAddresses();
    const res = [];
    const { 0: names, 1: tokens, 2: shields, 3: verifiers } = groups;
    for (let i = 0; i < names.length; i++) {
      res.push({
        name: names[i],
        tokenAddress: tokens[i],
        shieldAddress: shields[i],
        verifierAddress: verifiers[i],
      });
    }
    return res.map(function (group) {
      return workgroup.fromContract(group).toObject();
    });
  }

  /**
   * Registers callbacks for contract.
   * Listens for RegisterOrg and RegisterGroup events.
   * On event update local db accordingly.
   * @param registry
   */
  async registerCallbacks(registry: orgregistry.IOrgRegistry) {
    const contract = await getContract(registry.address, config.CONTRACTS.ORG_REGISTRY);
    contract.on("RegisterOrg", async function (name, address, msgUrl, msgKey, zkpKey, metadata, event) {
      const data = {
        orgAddress: address,
        name: name,
        messagingEndpoint: msgUrl,
        whisperKey: msgKey,
        zkpPublicKey: zkpKey,
        metadata: metadata,
      };
      const org = organization.fromContract(data);
      const reg = await orgregistry.db.findOne({ name: registry.name });
      if (!reg.orgsList.some((x) => x.name === org.getName())) {
        reg.orgsList.push(org.toObject());
        await reg.save();
      }
    });
    contract.on("RegisterGroup", async function (name, tokenAddress, shieldAddress, verifierAddress, event) {
      const data = {
        name: name,
        tokenAddress: tokenAddress,
        shieldAddress: shieldAddress,
        verifierAddress: verifierAddress,
      };
      logger.debug(`Triggered register group event: ${data}`);
      const group = workgroup.fromContract(data);
      const reg = await orgregistry.db.findOne({ name: registry.name });
      if (!reg.groupsList.some((x) => x.name === group.getName())) {
        reg.groupsList.push(group.toObject());
        await reg.save();
      }
    });
    this.contracts.push(contract);
  }
}
