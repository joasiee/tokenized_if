import { initialize, VerificationKey } from "zokrates-js";
import { readFileSync } from "fs";
import path from "path";
import { config } from "../config";
import { schema } from "./db";
import { dbConnect } from "@tokenized_if/shared";

const main = async function() {
  const zok = await initialize();
  const source = readFileSync(path.join(config.APP_ROOT, "circuits", "noopTest.zok")).toString();
  const artifacts = zok.compile(source);
  const keys = zok.setup(artifacts.program);
  const verifier = zok.exportSolidityVerifier(keys.vk, "v2");

  await dbConnect("zkp-mgr");
  await schema.db.create(schema.zokToModel("test2", artifacts, keys, verifier));
};

main();
