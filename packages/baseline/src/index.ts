import { commitMgrStart } from "./commit-mgr";
import { dbConnect } from "@tokenized_if/shared";
import { deployContract } from "./blockchain-mgr/contracts";
import { app_config } from "./config";

const main = async () => {
  await dbConnect(
    process.env.OMGR_DATABASE_USER,
    process.env.OMGR_DATABASE_PASSWORD,
    process.env.OMGR_DATABASE_NAME
  );
  const contract = await deployContract("ERC1820Registry.json", []);
  console.log(contract.address);
};

main();
