import dotenv from "dotenv";
import { ethers, utils, Wallet, ContractFactory, providers } from "ethers";

const shieldContract = require("../../artifacts/Shield.json");

dotenv.config();
const mnemonicPhrase = process.env.CMGR_WALLET_MNEMONIC;

export const testKey = async () => {
  const web3provider = new ethers.providers.JsonRpcProvider();
  const hdNode = utils.HDNode.fromMnemonic(mnemonicPhrase);
  const wallet = new Wallet(
    hdNode.derivePath("m/44'/60'/0'/0/0"),
    web3provider
  );
  let factory: ContractFactory = new ContractFactory(
    shieldContract.abi,
    shieldContract.bytecode,
    wallet
  );
  await factory.deploy("0x9773696710e8DD19F5DC883303a6668B33E9e999", 2);
};
