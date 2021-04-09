import fs from "fs";
import path from "path";
import { ContractFactory, Contract } from "ethers";
import { getLogger } from "@tokenized_if/shared";
import { HDWallet } from "../wallet";
import { config } from "../../config";
import solc from "solc";

const logger = getLogger("blockchain-mgr");
const wallet = HDWallet.getInstance().getWallet();

/**
 * Deploys contract from artifacts folder, compiled by @tokenized_if/truffle package.
 * @param contract contract name
 * @param args constructor args as array
 * @returns ethers {@link Contract}
 */
export async function deployContract(contract: string, args: any[] = []): Promise<Contract> {
  const filePath = path.join(config.APP_ROOT, "dist", "artifacts", contract + ".json");
  try {
    if (fs.existsSync(filePath)) {
      const contract = require(filePath);
      const factory = new ContractFactory(contract.abi, contract.bytecode || contract.evm.bytecode, wallet);
      return factory.deploy(...args);
    } else {
      logger.debug(`File does not exist at: ${filePath}`);
    }
  } catch (err) {
    logger.error(`Could not deploy contract at: ${filePath}, error: ${err}`);
  }
}

/**
 * Compiles contract during runtime using solc.
 * @param source source .sol file as string
 * @param out output path
 * @param contractName contract name to save to json
 * @returns success bool
 */
export function compileContract(source: string, out: string, contractName: string) {
  logger.debug(`Compiling contract using solc to ${out}, contract: ${contractName}`);
  try {
    const input = {
      language: "Solidity",
      sources: {
        contract: {
          content: source
        }
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"]
          }
        }
      }
    };
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    fs.writeFileSync(out, JSON.stringify(output.contracts["contract"][contractName]));
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

/**
 * Gets {@link Contract} instance connected to deployed contract.
 * @param address address of deployed contract
 * @param contract contract json name
 * @returns {@link Contract}
 */
export async function getContract(address: string, contract: string): Promise<Contract> {
  const filePath = path.join(config.APP_ROOT, "dist", "artifacts", contract + ".json");
  try {
    if (fs.existsSync(filePath)) {
      const contract = new Contract(address, require(filePath).abi, wallet);
      await contract.deployed();
      return contract;
    } else {
      logger.debug(`File does not exist at: ${filePath}`);
    }
  } catch (err) {
    logger.debug(`Could not get contract at: ${filePath}, error: ${err}`);
    return Promise.reject(err);
  }
}

/**
 * Checks if a contract is deployed at address.
 * @param address
 * @returns
 */
export async function isDeployed(address: string): Promise<boolean> {
  return (await wallet.provider.getCode(address)) != "0x";
}
