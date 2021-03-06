import { TradeTrustERC721 } from "../dist/typechain/TradeTrustERC721";
import { Wallet, providers, ethers } from "ethers";
import { TitleEscrow } from "../dist/typechain/TitleEscrow";
import { TradeTrustErc721Factory, TitleEscrowFactory } from "./contracts";
import Web3 from "web3";

/**
 * Config interface for TokenManager creation.
 */
export interface TokenManagerConfig {
  ganacheUrl: string;
  privateKey: string;
}

/**
 * Creates a new TokenManager object.
 * @param config The config consists of the ganacheURL and the private key of the person.
 * @returns
 */
export function createTokenManager(config: TokenManagerConfig) {
  return new TokenManager(config);
}

/**
 * TokenManager class to handle token deployment and other token functions.
 */
export class TokenManager {
  provider: providers.JsonRpcProvider;
  web3: Web3;
  signer: Wallet;
  private_key: string;
  constructor(config: TokenManagerConfig) {
    this.provider = new providers.JsonRpcProvider(config.ganacheUrl);
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.ganacheUrl));
    this.signer = new Wallet("0x" + config.privateKey, this.provider);
    this.private_key = config.privateKey;
  }

  /**
   * The Token Registry that is used to access the token registry contract.
   */
  tokenRegistry!: TradeTrustERC721;

  /**
   * tokenRegistryFactory, used to deploy token registry.
   */
  tokenRegistryFactory!: TradeTrustErc721Factory;

  /**************** **************** ****************
   **************** Useful Functions  *******************
   **************** **************** **************** */

  /**
   * Printing all accounts from Ganache.
   */
  printAllAccounts() {
    this.web3.eth.getAccounts().then(console.log);
  }

  /**
   * Helper function if we need it to get a single account.
   */
  async getSingleAccount(index: number) {
    try {
      let accounts;
      this.web3.eth.getAccounts().then(function (response) {
        accounts = response;
        console.log(accounts[index]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Sets up the Token Registry
   */
  async setupTokenRegistry() {
    try {
      this.tokenRegistryFactory = new TradeTrustErc721Factory(this.signer);
      this.tokenRegistry = await this.tokenRegistryFactory.deploy("MY_TOKEN_REGISTRY", "MTR");
      console.log("Deploying token registry");
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * This will create a token and put it in a given contract, the escrowInstance.
   */
  async createToken(escrowInstance: TitleEscrow, tokenID: ethers.BigNumberish) {
    try {
      await this.tokenRegistry["safeMint(address,uint256)"](escrowInstance.address, tokenID);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Deploys the title escrow contract on the blockchain with a given beneficiary and holder.
   * @param beneficiary The beneficiary of the title escrow contract.
   * @param holder The holder of the title escrow contract.
   * @returns It returns the a TitleEscrow instance.
   */
  async deployTitleEscrow(beneficiary: string, holder: string) {
    var instance;
    try {
      const factory = new TitleEscrowFactory(this.signer);
      instance = await factory.deploy(this.tokenRegistry.address, beneficiary, holder, beneficiary);
      console.log("executing deploy title escrow");
    } catch (e) {
      console.log(e);
    }
    return instance;
  }

  /**
   * The LSP deploys the importer escrow contract on the blockchain with importer as owner.
   * A token will de made from the tokenID and placed in this contract.
   * @param tokenID The ID of the token.
   * @param importerPublicAddress The public address of an importer.
   * @returns It returns an escrow instance, with beneficiary and holder as importer. The contract also  contains the token.
   */
  async deployImporterEscrow(tokenID: ethers.BigNumberish, importerPublicAddress: string): Promise<TitleEscrow> {
    var escrowInstance;
    try {
      escrowInstance = await this.deployTitleEscrow(importerPublicAddress, importerPublicAddress);
      if (escrowInstance) {
        await this.createToken(escrowInstance, tokenID);
      } else throw new Error("deployImporterEscrow: escrowInstance creation encountered a problem");
    } catch (e) {
      console.log(e);
      throw e;
    }
    return escrowInstance;
  }

  /**
   * Returns the owner of a token, given a tokenID.
   * @param tokenID A token ID.
   * @returns It returns an address of the owner of the given token.
   */
  async ownerOfToken(tokenID: ethers.BigNumberish) {
    var result;
    try {
      result = await this.tokenRegistry["ownerOf(uint256)"](tokenID);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  /**
   * Sleep helper function. Not used at the moment, leaving it just in case.
   * @param ms Time in ms to sleep.
   * @returns A promise. You can simply call the function to sleep.
   */
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Use this function to connect to an existing titleEscrow on the blockchain.
   * connectEscrowInstance("0x....", importerSigner).
   * @param address An address of a title escrow on the blockchain.
   * @param signerOrProvider Use a signer (wallet) or a provider in order to make the connection.
   * @returns
   */
  connectEscrowInstance(address: string, signerOrProvider: ethers.Signer | providers.Provider): TitleEscrow {
    var escrowInstance;
    escrowInstance = TitleEscrowFactory.connect(address, signerOrProvider);
    return escrowInstance;
  }

  /**
   * Use this function to connect to an existing TokenRegistry on the blockchain.
   * @param address The address where the token registry is located.
   * @param signerOrProvider Use a signer (wallet) or a provider in order to make the connection.
   * @returns An instance of the token registry.
   */
  connectTokenRegistry(address: string, signerOrProvider: ethers.Signer | providers.Provider) {
    this.tokenRegistry = TradeTrustErc721Factory.connect(address, signerOrProvider);
    return this.tokenRegistry;
  }

  /**
   * Gets the token balance from a given TitleEscrow.
   * @param escrowInstance An instance of a title escrow.
   * @returns Returns the amount of tokens on the given title escrow.
   */
  async getTokenBalance(escrowInstance: TitleEscrow) {
    var result;
    result = await this.tokenRegistry["balanceOf(address)"](escrowInstance.address);
    return result;
  }

  /**
   * Convert ether to wei.
   * @param eth The amount of ethers. Can be given as string or number.
   * @returns Returns wei as string.
   */
  ethToWei(eth: string | number): string {
    eth = eth.toString();
    return this.web3.utils.toWei(eth, "ether");
  }

  /**
   * Sends ether from an address to another address.
   * @param from_address "from", a public address.
   * @param to_address  "to", also a public address.
   * @param amount_ether The amount of ethers to send.
   * @param priv_key The private key of the sender.
   */
  async sendEther(from_address: string, to_address: string, amount_ether: string | number, priv_key: string) {
    const nonce = await this.web3.eth.getTransactionCount(from_address, "latest");
    const transaction = {
      to: to_address,
      value: this.ethToWei(amount_ether),
      gas: 5000000,
      gasLimit: 5000000,
      nonce: nonce,
    };
    const signedTx = await this.web3.eth.accounts.signTransaction(transaction, priv_key);
    await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!, function (error, hash) {
      if (!error) {
        console.log("sent " + amount_ether + "ETH" + ", Hash of transaction is: ", hash);
      } else {
        console.log("Something went wrong with sendEther transaction:", error);
      }
    });
  }

  /**
   * Used to parse BigNumber, and hex to numberString.
   * @param number a bignumber of the type ethers.BigNumber
   * @returns returns a string representation of the big number.
   */
  parseBigNumber(number: ethers.BigNumber) {
    return this.web3.utils.hexToNumberString(number._hex);
  }

  /**
   * Retrieves tokenPrice and converts to ether amount.
   * @param escrowInstance An escrow instance, which is a title escrow.
   * @returns returns the price that was set for the token.
   */
  async getTokenPrice(escrowInstance: TitleEscrow): Promise<string> {
    var price = await escrowInstance.getTokenPrice();
    return this.web3.utils.fromWei(this.parseBigNumber(price));
  }

  /**
   * Retrieves buyBackPrice and converts to ether amount.
   * @param escrowInstance An escrow instance, which is a title escrow.
   * @returns returns the buy back price that was set for the token.
   */
  async getTokenBuyBackPrice(escrowInstance: TitleEscrow): Promise<string> {
    var buyBackPrice = await escrowInstance.getBuyBackPrice();
    return this.web3.utils.fromWei(this.parseBigNumber(buyBackPrice));
  }

  /**
   * Retrieves the contract destination address. This is the address where the token transfers to, after payment.
   * @param escrowInstance An escrow instance, which is a title escrow.
   * @returns returns a string which is the contract destination. The address to which the holder will change to after payment.
   */
  async getContractDest(escrowInstance: TitleEscrow): Promise<string> {
    return await escrowInstance.getcontractDest();
  }

  /**
   * Gets the deal which includes price, buyBackPrice and the contract destination.
   * It returns an array which contains the three variables.
   * @param escrowInstance An escrow instance, which is a title escrow.
   * @returns Returns an array [Price, buyBackPrice and to_addr].
   */
  async getTokenDeal(escrowInstance: TitleEscrow) {
    var deal = await escrowInstance.getTokenDeal();
    var price = this.web3.utils.fromWei(this.parseBigNumber(deal[0]));
    var buyBackPrice = this.web3.utils.fromWei(this.parseBigNumber(deal[1]));
    var to_addr = deal[2];
    return [price, buyBackPrice, to_addr];
  }

  /**
   *  Returns the ether balance stored in a TitleEscrow.
   * @param escrowInstance An escrow instance, which is a title escrow.
   * @returns returns a string which is the amount of ethers stored on the title escrow.
   */
  async getETHBalance(escrowInstance: TitleEscrow) {
    var balance = (await escrowInstance.getBalance())._hex;
    return this.web3.utils.fromWei(balance);
  }

  /**
   * Sends a release by sending the token back to the token registry.
   * It will print a console log after sending release.
   * @param escrowInstance An escrow instance, which is a title escrow.
   */
  async sendRelease(escrowInstance: TitleEscrow) {
    await escrowInstance.transferTo(this.tokenRegistry.address);
    console.log("Sending release");
  }

  /**
   * Calls the destroy Token function from the token registry contract.
   * New owner will be 0x000000000000000000000000000000000000dEaD.
   * It will also print a console log after destroying the token.
   * @param tokenID The token ID to burn
   */
  async burnToken(tokenID: ethers.BigNumberish) {
    await this.tokenRegistry["destroyToken(uint256)"](tokenID);
    console.log("Token burned, owner of token is: " + (await this.ownerOfToken(tokenID)));
  }

  /**
   * Get the token registry that is currently set.
   * @returns token registry
   */
  getRegistry() {
    return this.tokenRegistry;
  }
}

/**************** **************** ****************
 **************** Main  *******************
 ** An example of the flow **
 **************** **************** **************** */

/**
 * This is just a simple example to see if it works, as manual testing.
 */
async function main() {
  // tokenId, should be the hash of the document.
  let tokenID = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";
  let lspPrivateKey = "92cb1c44a8f73871ccaab89b049359e4d06f43ad7c71ccf983c61b14d8836562";
  let importerPrivateKey = "859c199d05f8fbbe8092f79e99e6792303664a013777c115c2842bbb96e61ce6";
  let financerPrivateKey = "ddea9ab7e47e56672451e5833a2a8bffa6c4696706681017d91e4749821fb792";
  let ganacheURL = "http://127.0.0.1:7545";
  console.log("Running main");
  try {
    let lspTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: lspPrivateKey });
    let importerTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: importerPrivateKey });
    let financerTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: financerPrivateKey });

    let importerPublicAddress = await importerTM.signer.getAddress();
    let financerPublicAddress = await financerTM.signer.getAddress();

    ////////////// LSP PART ///////////
    await lspTM.setupTokenRegistry();
    // Token Registry address needs to be shared!
    let tokenRegistryAddress = lspTM.tokenRegistry.address;
    let LSP_escrowInstance = await lspTM.deployImporterEscrow(tokenID, importerPublicAddress);
    // Escrow address needs to be shared!
    let escrowAddress = LSP_escrowInstance.address;
    console.log("Current owner of token is: " + (await lspTM.ownerOfToken(tokenID)));

    ////////////// Importer PART ///////////
    importerTM.connectTokenRegistry(tokenRegistryAddress, importerTM.signer);
    let importer_escrowInstance = importerTM.connectEscrowInstance(escrowAddress, importerTM.signer);
    console.log("token balance on contract is : " + (await importerTM.getTokenBalance(importer_escrowInstance)));

    // Sets a deal tokenPrice = 5ETH, buyBackPrice = 7ETH, holder will transfer to financer after payment
    await importer_escrowInstance.setTokenDeal(importerTM.ethToWei(5), importerTM.ethToWei(7), financerPublicAddress);
    let deal = await importerTM.getTokenDeal(importer_escrowInstance);
    console.log("[DEAL] price: ", deal[0], ", buyBackprice: ", deal[1], ", token transferred to: ", deal[2]);
    console.log("Current Holder: ", await importer_escrowInstance.holder());

    ////////////// Financer PART ///////////
    financerTM.connectTokenRegistry(tokenRegistryAddress, financerTM.signer);
    let financer_escrowInstance = financerTM.connectEscrowInstance(escrowAddress, financerTM.signer);
    await financerTM.sendEther(financerPublicAddress, escrowAddress, 5, financerTM.private_key);
    console.log("Current holder", await financer_escrowInstance.holder());

    ////////////// Importer PART ///////////
    await importerTM.sendEther(importerPublicAddress, escrowAddress, 7, importerTM.private_key);
    importer_escrowInstance = importerTM.connectEscrowInstance(escrowAddress, importerTM.signer);
    console.log("Current holder", await importer_escrowInstance.holder());
    console.log("Beneficiary", await importer_escrowInstance.beneficiary());

    await importerTM.sendRelease(importer_escrowInstance);
    console.log("token balance on contract is : " + (await importerTM.getTokenBalance(importer_escrowInstance)));
    console.log("Current owner of token is: " + (await importerTM.ownerOfToken(tokenID)));

    ////////////// LSP PART ///////////
    lspTM.connectTokenRegistry(tokenRegistryAddress, lspTM.signer);
    await lspTM.burnToken(tokenID);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Version2 of main.
 * Deploying 2 title escrows, same token registry.
 * A more complicated order and interaction of buying and buying back. And burning both at the end.
 */
async function mainV2() {
  let tokenID = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";
  let tokenID2 = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb9";
  let lspPrivateKey = "ff3abd8ad911f5f49b6efd3c70eb1a6a573181fc16aeb0d1ac4f97ead1910470";
  let importerPrivateKey = "deb457fd9ead02fba320d3c8db3b14fa7df0eb8fa2401ad82531ebce3b218e8c";
  let financerPrivateKey = "15b2027cc808d97e3c9b0be3db579fd6c3a64ee3e7ae53446f8060b46cf27f68";
  let ganacheURL = "http://172.30.64.1:7545";
  console.log("Running main V2");
  try {
    let lspTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: lspPrivateKey });
    let importerTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: importerPrivateKey });
    let financerTM = createTokenManager({ ganacheUrl: ganacheURL, privateKey: financerPrivateKey });

    let importerPublicAddress = await importerTM.signer.getAddress();
    let financerPublicAddress = await financerTM.signer.getAddress();

    ////////////// LSP PART ///////////
    await lspTM.setupTokenRegistry();
    // Token Registry address needs to be shared!
    let tokenRegistryAddress = lspTM.tokenRegistry.address;
    // Deploy two escrow instances
    let LSP_escrowInstance = await lspTM.deployImporterEscrow(tokenID, importerPublicAddress);
    let LSP_escrowInstance2 = await lspTM.deployImporterEscrow(tokenID2, importerPublicAddress);
    // Escrow address needs to be shared!
    let escrowAddress = LSP_escrowInstance.address;
    let escrowAddress2 = LSP_escrowInstance2.address;

    ////////////// Importer PART ///////////
    importerTM.connectTokenRegistry(tokenRegistryAddress, importerTM.signer);
    let importer_escrowInstance = importerTM.connectEscrowInstance(escrowAddress, importerTM.signer);
    let importer_escrowInstance2 = importerTM.connectEscrowInstance(escrowAddress2, importerTM.signer);
    console.log("token balance on contract 1 is : " + (await importerTM.getTokenBalance(importer_escrowInstance)));
    console.log("token balance on contract 2 is : " + (await importerTM.getTokenBalance(importer_escrowInstance2)));

    await importer_escrowInstance.setTokenDeal(importerTM.ethToWei(5), importerTM.ethToWei(7), financerPublicAddress);
    await importer_escrowInstance2.setTokenDeal(
      importerTM.ethToWei(10),
      importerTM.ethToWei(15),
      financerPublicAddress
    );

    let deal = await importerTM.getTokenDeal(importer_escrowInstance);
    let deal2 = await importerTM.getTokenDeal(importer_escrowInstance2);
    console.log(
      "[DEAL for token 1] price: ",
      deal[0],
      ", buyBackprice: ",
      deal[1],
      ", token transferred to: ",
      deal[2]
    );
    console.log(
      "[DEAL for token 2] price: ",
      deal2[0],
      ", buyBackprice: ",
      deal2[1],
      ", token transferred to: ",
      deal2[2]
    );

    ////////////// Financer PART ///////////
    // financer decides to buy token2 first.
    console.log("Financer decides to buy token2 first");
    financerTM.connectTokenRegistry(tokenRegistryAddress, financerTM.signer);
    let financer_escrowInstance2 = financerTM.connectEscrowInstance(escrowAddress2, financerTM.signer);
    await financerTM.sendEther(financerPublicAddress, escrowAddress2, 10, financerTM.private_key);
    console.log("Current holder token2 ", await financer_escrowInstance2.holder());

    ////////////// Importer PART ///////////
    // importer decides to buy token2 back.
    console.log("importer decides to buy back token2");
    await importerTM.sendEther(importerPublicAddress, escrowAddress2, 15, importerTM.private_key);
    importer_escrowInstance2 = importerTM.connectEscrowInstance(escrowAddress2, importerTM.signer);
    console.log("Current holder token2 ", await importer_escrowInstance2.holder());
    console.log("Beneficiary token2 ", await importer_escrowInstance2.beneficiary());

    ////////////// Financer PART ///////////
    // financer decides to buy token1 now.
    console.log("financer decides to buy token1 now");
    let financer_escrowInstance = financerTM.connectEscrowInstance(escrowAddress, financerTM.signer);
    await financerTM.sendEther(financerPublicAddress, escrowAddress, 5, financerTM.private_key);
    console.log("Current holder token1 ", await financer_escrowInstance.holder());

    ////////////// Importer PART ///////////
    // importer decides to request release for token2.
    console.log("importer decides to request release for token2");
    importer_escrowInstance2 = importerTM.connectEscrowInstance(escrowAddress2, importerTM.signer);
    await importerTM.sendRelease(importer_escrowInstance2);
    console.log("token balance on contract2 is : " + (await importerTM.getTokenBalance(importer_escrowInstance2)));
    console.log("Current owner of token2 is: " + (await importerTM.ownerOfToken(tokenID2)));

    // importer decides to buy token1 back.
    console.log("importer decides to buy token1 back");
    await importerTM.sendEther(importerPublicAddress, escrowAddress, 7, importerTM.private_key);
    importer_escrowInstance = importerTM.connectEscrowInstance(escrowAddress, importerTM.signer);
    console.log("Current holder token1 ", await importer_escrowInstance.holder());
    console.log("Beneficiary token1 ", await importer_escrowInstance.beneficiary());

    // importer decides to request release for token1.
    console.log("importer decides to request release for token1");
    importer_escrowInstance = importerTM.connectEscrowInstance(escrowAddress, importerTM.signer);
    await importerTM.sendRelease(importer_escrowInstance);
    console.log("token balance on contract1 is : " + (await importerTM.getTokenBalance(importer_escrowInstance)));
    console.log("Current owner of token1 is: " + (await importerTM.ownerOfToken(tokenID)));

    ////////////// LSP PART ///////////
    // LSP has received both release requests and confirms to burn both.
    console.log("LSP has received both release requests and confirms to burn both.");
    lspTM.connectTokenRegistry(tokenRegistryAddress, lspTM.signer);
    await lspTM.burnToken(tokenID);
    await lspTM.burnToken(tokenID2);
  } catch (e) {
    console.log(e);
  }
}

//main();
