import { dbConnect } from "@tokenized_if/shared";
import { ZKPService } from "./service";

export * as zkp_mgr from "./server";

async function main() {
  const zok = new ZKPService();
  await dbConnect(process.env.MONGO_DB_NAME);
  await zok.init();
  await zok.compileCircuit("addShipment");
  // await zok.generateProof("noopTest", ["5"]);
  console.log("done");
}

main();