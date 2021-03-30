import { getContract, isDeployed } from "../../blockchain-mgr";
import { orgregistry, organization } from "../models";
import { OrgRegistry as OrgRegistryContract } from "../../../dist/typechain/OrgRegistry";
import { config } from "../../config";
import { getLogger } from "@tokenized_if/shared";

const logger = getLogger("org-service");

export async function updateDB() {
  const registries = await orgregistry.db.find();
  for (const registry of registries) {
    updateRegistry(registry);
  }
}

function updateRegistry(registry: orgregistry.IOrgRegistry) {
  if (!isDeployed(registry.address)) {
    registry.deleteOne();
    return;
  }
  updateOrgs(registry);
}

async function updateOrgs(registry: orgregistry.IOrgRegistry) {
  let contract: OrgRegistryContract = getContract(
    registry.address,
    config.CONTRACTS.ORG_REGISTRY
  ) as OrgRegistryContract;
  const orgs = [];
  const orgCount = await contract.getOrgCount();
  for (let i = 0; orgCount.gt(i); i++) {
    orgs.push(organization.fromContract(await contract.orgs(i)).toObject());
  }
  registry.orgsList = orgs;
  await registry.save();
}
