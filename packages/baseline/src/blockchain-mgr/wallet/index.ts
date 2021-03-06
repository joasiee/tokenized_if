import { Wallet, utils, providers } from "ethers";

const defaultPathPrefix = "m/44'/60'/0'/0/";

/**
 * HD Wallet class, derived from mnemonic.
 * Singleton, capable of rotating private keys easily.
 */
export class HDWallet {
  private static instance: HDWallet;

  private hdNode: utils.HDNode;
  private addressN: number;
  private provider: providers.Provider;

  private constructor() {
    this.hdNode = utils.HDNode.fromMnemonic(process.env.BMGR_MNEMONIC);
    this.addressN = 0;
    this.provider = new providers.JsonRpcProvider(process.env.ETH_CLIENT_HTTP);
  }

  /**
   * Gets singleton instance.
   * @returns
   */
  public static getInstance(): HDWallet {
    if (!HDWallet.instance) {
      HDWallet.instance = new HDWallet();
    }
    return HDWallet.instance;
  }

  /**
   * Get ethers {@link Wallet} coupled with JSON rpc provider.
   * @returns
   */
  public getWallet(): Wallet {
    return new Wallet(this.hdNode.derivePath(defaultPathPrefix + this.addressN.toString()), this.provider);
  }

  /**
   * Increment current used account, so that {@link getWallet} will return a new wallet.
   */
  public updateWallet(): void {
    this.addressN += 1;
  }
}
