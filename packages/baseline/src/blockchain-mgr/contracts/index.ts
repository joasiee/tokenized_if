import fs from "fs";
import path from "path";
import { ContractFactory, Contract } from "ethers";
import { getLogger } from "@tokenized_if/shared";
import { HDWallet } from "../wallet";
import { app_config } from "../../config";

const logger = getLogger("blockchain-mgr");

export async function deployContract(
  contract: string,
  args: any[]
): Promise<Contract> {
  const wallet = HDWallet.getInstance().getWallet();
  const filePath = path.join(
    app_config.APP_ROOT,
    "dist",
    "artifacts",
    contract
  );
  try {
    if (fs.existsSync(filePath)) {
      const contract = require(filePath);
      const factory = new ContractFactory(
        contract.abi,
        contract.bytecode,
        wallet
      );
      return factory.deploy(...args);
    } else {
      logger.debug(`File does not exist at: ${filePath}`);
    }
  } catch (err) {
    logger.error(`Could not deploy contract at: ${filePath}, error: ${err}`);
  }
}
