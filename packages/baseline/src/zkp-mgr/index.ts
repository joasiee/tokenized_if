import { schema } from "./db";
import { ZKPService } from "./service";

export * as zkp_mgr from "./server";

const main = async function() {
  const zok = new ZKPService();
  await zok.init();
  // await zok.compileCircuit("noopTest");
  console.log((await zok.generateProof("noopTest", ["2"])));
}

main();