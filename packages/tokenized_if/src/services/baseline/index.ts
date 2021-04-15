import { trackShield } from "./commit";
import { addWorkgroup, deployOrgRegistry } from "./organizations";
import { compileCircuit, deployCircuit, getVerifieraddress } from "./zkp";

export default async function baselineSetup() {
  // Setup Org Registry for importers and financers
  const importerRegistry = await deployOrgRegistry("importer-registry");
  console.log(`Deployed importer registry at address: ${importerRegistry.getAddress()}`);
  const financerRegistry = await deployOrgRegistry("financer-registry");
  console.log(`Deployed financer registry at address: ${financerRegistry.getAddress()}`);
  const lspRegistry = await deployOrgRegistry("lsp-registry");
  console.log(`Deployed lsp registry at address: ${lspRegistry.getAddress()}`);

  // Compile, deploy and obtain verifier circuit
  const noopCircuit = "noopTest";
  await compileCircuit(noopCircuit);
  await deployCircuit(noopCircuit);
  const verifierAddress = await getVerifieraddress(noopCircuit);
  console.log(`Deployed verifier at address: ${verifierAddress}`);

  // Add importer workgroup to registry
  const workgroupRegistry = await addWorkgroup(verifierAddress, importerRegistry.getAddress());
  const shieldAddress = workgroupRegistry.getGroupsList()[0].getShieldaddress();
  console.log(`Shield contract at address: ${shieldAddress}`);

  // Track shield contract
  await trackShield(shieldAddress);
}
