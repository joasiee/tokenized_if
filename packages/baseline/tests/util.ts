import { orgregistry } from "../src/organization-mgr/db";
import { circuit } from "../src/zkp-mgr/db";
import { merkleTrees } from "../src/commit-mgr/db/models/MerkleTree";

export async function clearDBs() {
  await orgregistry.db.remove();
  await circuit.db.remove();
  await merkleTrees.remove();
}
