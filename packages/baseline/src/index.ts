import dotenv from "dotenv";
import { commitMgrStart } from "./commit-mgr";
import { getLogger, dbConnect } from "@tokenized_if/shared";

const main = async () => {
  dotenv.config();
  await dbConnect(
    process.env.OMGR_DATABASE_USER,
    process.env.OMGR_DATABASE_PASSWORD,
    process.env.OMGR_DATABASE_NAME
  );
};

main();
