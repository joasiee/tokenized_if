import { getContract, isDeployed } from "../../blockchain-mgr";
import { orgregistry, organization } from "./models";
import { config } from "../../config";
import { getLogger } from "@tokenized_if/shared";

const logger = getLogger("org-service");

export async function updateDB() {
  const registries = await orgregistry.db.find();
  for (const registry of registries) {
    updateRegistry(registry);
  }
}

async function updateRegistry(registry: orgregistry.IOrgRegistry) {
  if (!(await isDeployed(registry.address))) {
    await registry.deleteOne();
    return;
  }
  registry.orgsList = [];
  registry.groupsList = [];
  await registry.save();
  await registerCallbacks(registry);
}

async function registerCallbacks(registry: orgregistry.IOrgRegistry) {
  const contract = getContract(registry.address, config.CONTRACTS.ORG_REGISTRY);
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
    reg.orgsList.push(org.toObject());
    await reg.save();
  });
}
