import dotenv from "dotenv";
import { commitMgrStart } from "./commit-mgr";
import { getLogger } from "@tokenized_if/shared";

dotenv.config();
const logger = getLogger("main");
commitMgrStart();
