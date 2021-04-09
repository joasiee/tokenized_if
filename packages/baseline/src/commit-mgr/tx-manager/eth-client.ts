import { ITxManager } from ".";
import { getLogger } from "@tokenized_if/shared";
import { getContract, HDWallet } from "../../blockchain-mgr";
import { Shield } from "../../../dist/typechain/Shield";

const logger = getLogger("commit-mgr");

export class EthClient implements ITxManager {
  constructor(private readonly config: any) {
    this.config = config;
  }

  async signTx(toAddress: string, fromAddress: string, txData: any) {
    const wallet = HDWallet.getInstance().getWallet();
    const nonce = await wallet.getTransactionCount();
    logger.debug(`nonce: ${nonce}`);
    const gasPrice = await wallet.getGasPrice();
    logger.debug(`gasPrice found: ${gasPrice}`);
    const gasPriceSet = Math.ceil(Number(gasPrice) * 1.2);
    logger.debug(`gasPrice set: ${gasPriceSet}`);

    const unsignedTx = {
      to: toAddress,
      from: fromAddress,
      data: txData,
      nonce,
      chainId: parseInt(process.env.ETH_CHAIN_ID, 10),
      gasLimit: 0,
      gasPrice: gasPriceSet
    };

    const gasEstimate = await wallet.estimateGas(unsignedTx);
    logger.debug(`gasEstimate: ${gasEstimate}`);
    unsignedTx.gasLimit = Math.ceil(Number(gasEstimate) * 1.1);
    logger.debug(`gasLimit set: ${unsignedTx.gasLimit}`);

    const signedTx = wallet.signTransaction(unsignedTx);
    return signedTx;
  }

  async insertLeaf(toAddress: string, fromAddress: string, proof: any[8], publicInputs: any[1], newCommitment: string) {
    let error = null;
    let txHash: string = "";
    try {
      const shieldContract: Shield = (await getContract(toAddress, "Shield")) as Shield;
      const options = { gasLimit: 1000000 };
      const result = await shieldContract.verifyAndPush(proof, publicInputs, "0x" + newCommitment, options);
      txHash = (await result.wait(1)).transactionHash;
    } catch (err) {
      logger.error(`[baseline_verifyAndPush]: ${err}`);
    }
    return { error, txHash };
  }
}
