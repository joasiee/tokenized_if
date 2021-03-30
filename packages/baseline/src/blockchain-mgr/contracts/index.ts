import fs from "fs";
import path from "path";
import { ContractFactory, Contract } from "ethers";
import { getLogger } from "@tokenized_if/shared";
import { HDWallet } from "../wallet";
import { config } from "../../config";

const logger = getLogger("blockchain-mgr");
const wallet = HDWallet.getInstance().getWallet();

export async function deployContract(contract: string, args: any[]): Promise<Contract> {
  const filePath = path.join(config.APP_ROOT, "dist", "artifacts", contract);
  try {
    if (fs.existsSync(filePath)) {
      const contract = require(filePath);
      const factory = new ContractFactory(contract.abi, contract.bytecode, wallet);
      return factory.deploy(...args);
    } else {
      logger.debug(`File does not exist at: ${filePath}`);
    }
  } catch (err) {
    logger.error(`Could not deploy contract at: ${filePath}, error: ${err}`);
  }
}

export function getContract(address: string, contract: string): Contract {
  const filePath = path.join(config.APP_ROOT, "dist", "artifacts", contract);
  try {
    if (fs.existsSync(filePath)) {
      const contract = require(filePath);
      return new Contract(address, contract.abi, wallet);
    } else {
      logger.debug(`File does not exist at: ${filePath}`);
    }
  } catch (err) {
    logger.error(`Could not get contract at: ${filePath}, error: ${err}`);
  }
}

export async function isDeployed(address: string): Promise<boolean> {
  return (await wallet.provider.getCode(address)) != "0x";
}
