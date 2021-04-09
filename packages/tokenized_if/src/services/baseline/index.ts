import { deployOrgRegistry } from "./organizations";
import { compileCircuit, deployCircuit, getVerifieraddress } from "./zkp";

export default async function baselineSetup() {

  // Setup Org Registry for importers and financers
  const importerRegistry = await deployOrgRegistry('importer-registry');
  const financerRegistry = await deployOrgRegistry('financer-registry');

  // Compile, deploy and obtain verifier circuit
  const noopCircuit = "noopTest";
  await compileCircuit(noopCircuit);
  await deployCircuit(noopCircuit);
  const verifierAddress = await getVerifieraddress(noopCircuit);
  

}