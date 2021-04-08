import { schema } from "./db";
import { ZKPService } from "./service";
import { concatThenHash } from "./util";

export * as zkp_mgr from "./server";

const main = async function() {
  // const zok = new ZKPService();
  // await zok.init();
  // // await zok.compileCircuit("noopTest");
  // const model = await zok.getCircuit("noopTest");
  // console.log(schema.modelToProto(model).getArtifacts().getAbi());
  console.log(concatThenHash([BigInt(0), BigInt(0), BigInt(0), BigInt(0)]));
}

main();