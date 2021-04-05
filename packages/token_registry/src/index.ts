export { TitleEscrowFactory } from "./contracts/TitleEscrowFactory";
export { TradeTrustErc721Factory } from "./contracts/TradeTrustErc721Factory";
export { TitleEscrowCreatorFactory } from "./contracts/TitleEscrowCreatorFactory";
export { getTitleEscrowCreatorAddress } from "./config";

import { TradeTrustErc721 } from "../types/TradeTrustErc721";
import { TitleEscrowCreator } from "../types/TitleEscrowCreator";
import { TitleEscrowFactory, TradeTrustErc721Factory, TitleEscrowCreatorFactory } from "./index";
import { Wallet, providers, getDefaultProvider, ethers, Contract } from "ethers";
import { TitleEscrow } from "./contracts/TitleEscrow";
import Web3 from "web3";



class token_manager {
  constructor() {
  }

// Variables
tokenRegistry!: TradeTrustErc721;

// Setting up ganache connections
 ganacheURL = "http://172.30.64.1:7545";
 provider = new providers.JsonRpcProvider(this.ganacheURL);
web3 = new Web3(new Web3.providers.HttpProvider(this.ganacheURL));

// Signers, abstraction of ethereum account to sign messages/transactions.
 LSPSigner = this.provider.getSigner(0);
 importerSigner = this.provider.getSigner(1);
 financerSigner = this.provider.getSigner(2);

// Public addresses for importer and financer.
importerPublicAddress!: string;
financerPublicAddress!: string;

// Private keys
importerPrivateKey = "deb457fd9ead02fba320d3c8db3b14fa7df0eb8fa2401ad82531ebce3b218e8c";
financerPrivateKey = "15b2027cc808d97e3c9b0be3db579fd6c3a64ee3e7ae53446f8060b46cf27f68";

// tokenId, should be the hash of the document.
tokenID = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";

// tokenRegistryFactory, used to deploy token registry.
tokenRegistryFactory = new TradeTrustErc721Factory(this.LSPSigner);




/**************** **************** **************** 
**************** Useful Functions  *******************
**************** **************** **************** */


/**
* Sets up public addresses for importer and financer.
*/
async setupPublicAddresses() {
  try {
    this.importerPublicAddress = await this.importerSigner.getAddress();
    this.financerPublicAddress = await this.financerSigner.getAddress();
  }
  catch (e) {
    console.log(e);
  }
}

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
      accounts = response; console.log(accounts[index]);
    });
  }
  catch (e) {
    console.log(e);
  }
}

/**
* Sets up the Token Registry
*/
async setupTokenRegistry() {
  try {
    this.tokenRegistry = await this.tokenRegistryFactory.deploy("MY_TOKEN_REGISTRY", "MTR");
    console.log("Deploying token registry");
  }
  catch (e) {
    console.log(e);
  }
}

/**
* This will create a token and put it in a given contract, the escrowInstance.
*/
 async  createToken(escrowInstance: TitleEscrow, tokenID: ethers.BigNumberish) {
  try {
    await this.tokenRegistry["safeMint(address,uint256)"](escrowInstance.address, tokenID);
  }
  catch (e) {
    console.log(e);
  }
}

/**
* Deploys the title escrow contract on the blockchain with a given beneficiary and holder.
*/
 async  deployTitleEscrow(beneficiary: string, holder: string) {
  var instance;
  try {
    const factory = new TitleEscrowFactory(this.LSPSigner);
    instance = await factory.deploy(this.tokenRegistry.address, beneficiary, holder, beneficiary);
    console.log("executing deploy title escrow");
  }
  catch (e) {
    console.log(e);
  }
  return instance;
}


/**
* The LSP deploys the importer escrow contract on the blockchain with importer as owner.
* A token will de made from the tokenID and placed in this contract.
*/
 async  deployImporterEscrow(tokenID: ethers.BigNumberish): Promise<TitleEscrow> {
  var escrowInstance;
  try {
    escrowInstance = await this.deployTitleEscrow(this.importerPublicAddress, this.importerPublicAddress);
    if (escrowInstance) {
      await this.createToken(escrowInstance, tokenID);
    }
    else throw new Error("deployImporterEscrow: escrowInstance creation encountered a problem");
  }
  catch (e) {
    console.log(e);
    throw (e);
  }
  return escrowInstance;
}


/**
* Returns the owner of a token, given a tokenID.
*/
 async  ownerOfToken(tokenID: ethers.BigNumberish) {
  var result;
  try {
    result = await this.tokenRegistry["ownerOf(uint256)"](tokenID);
  }
  catch (e) {
    console.log(e);
  }
  return result;
}

/**
* Sleep helper function. Not used at the moment, leaving it just in case.
*/
  sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* Use this function to connect to an existing titleEscrow on the blockchain.
* connectEscrowInstance("0x....", importerSigner).
*/
 connectEscrowInstance(address: string, signerOrProvider: ethers.Signer | providers.Provider): TitleEscrow {
  var escrowInstance;
  escrowInstance = TitleEscrowFactory.connect(address, signerOrProvider);
  return escrowInstance;
}

/**
* Use this function to connect to an existing TokenRegistry on the blockchain.
*/
  connectTokenRegistry(address: string, signerOrProvider: ethers.Signer | providers.Provider) {
    this.tokenRegistry = TradeTrustErc721Factory.connect(address, signerOrProvider);
  return this.tokenRegistry;
}

/**
* Gets the token balance from a given TitleEscrow.
*/
 async getTokenBalance(escrowInstance: TitleEscrow) {
  var result;
  result = await this.tokenRegistry["balanceOf(address)"](escrowInstance.address);
  return result;
}

/**
* Convert ether to wei.
*/
  ethToWei(eth: string | number): string {
  eth = eth.toString()
  return this.web3.utils.toWei(eth, 'ether');
}

/**
* Sends ether from an address to another address.
*/
 async  sendEther(from_address: string, to_address: string, amount_ether: string | number, priv_key: string) {
  const nonce = await this.web3.eth.getTransactionCount(from_address, 'latest');
  const transaction = {
    'to': to_address,
    'value': this.ethToWei(amount_ether),
    'gas': 5000000,
    'gasLimit': 5000000,
    'nonce': nonce,
  };
  const signedTx = await this.web3.eth.accounts.signTransaction(transaction, priv_key);
  await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!, function (error, hash) {
    if (!error) {
      console.log("sent " + amount_ether + "ETH" + ", Hash of transaction is: ", hash);
    }
    else {
      console.log("Something went wrong with sendEther transaction:", error)
    }
  });
}

/**
* Used to parse BigNumber, and hex to numberString.
*/
 parseBigNumber(number: ethers.BigNumber) {
  return this.web3.utils.hexToNumberString(number._hex);
}

/**
* Retrieves tokenPrice and converts to ether amount.
*/
 async  getTokenPrice(escrowInstance: TitleEscrow): Promise<string> {
  var price = await escrowInstance.getTokenPrice();
  return this.web3.utils.fromWei(this.parseBigNumber(price));
}

/**
* Retrieves buyBackPrice and converts to ether amount.
*/
 async  getTokenBuyBackPrice(escrowInstance: TitleEscrow): Promise<string> {
  var buyBackPrice = await escrowInstance.getBuyBackPrice();
  return this.web3.utils.fromWei(this.parseBigNumber(buyBackPrice));
}

/**
* Retrieves the contract destination address. This is the address where the token transfers to, after payment.
*/
 async  getContractDest(escrowInstance: TitleEscrow): Promise<string> {
  return await escrowInstance.getcontractDest();
}

/**
* Gets the deal which includes price, buyBackPrice and the contract destination.
* It returns an array which contains the three variables.
*/
 async  getTokenDeal(escrowInstance: TitleEscrow) {
  var deal = await escrowInstance.getTokenDeal();
  var price = this.web3.utils.fromWei(this.parseBigNumber(deal[0]));
  var buyBackPrice = this.web3.utils.fromWei(this.parseBigNumber(deal[1]));
  var to_addr = deal[2];
  return [price, buyBackPrice, to_addr];
}

/**
*  Returns the ether balance stored in a TitleEscrow.
*/
 async  getETHBalance(escrowInstance: TitleEscrow) {
  var balance = (await escrowInstance.getBalance())._hex;
  return this.web3.utils.fromWei(balance);
}


/**
 * Sends a release by sending the token back to the token registry.
 */
 async  sendRelease(escrowInstance: TitleEscrow) {
  await escrowInstance.transferTo(this.tokenRegistry.address);
  console.log("Sending release");
}

/**
 * Calls the destroy Token function from the token registry contract.
 * New owner will be 0x000000000000000000000000000000000000dEaD.
 * @param tokenID The token ID to burn
 */
 async  burnToken(tokenID: ethers.BigNumberish) {
  await this.tokenRegistry["destroyToken(uint256)"](tokenID);
  console.log("Token burned, owner of token is: " + await this.ownerOfToken(tokenID));
}

/**************** **************** **************** 
**************** Main  *******************
      ** An example of the flow **
**************** **************** **************** */

async  main() {
  console.log("Running main");
  try {
    await this.setupPublicAddresses();
    await this.setupTokenRegistry();
    // Deploys an escrow contract as owner the importer.
    var escrowInstance = await this.deployImporterEscrow(this.tokenID);

    console.log("Current owner of token is: " + await this.ownerOfToken(this.tokenID));
    escrowInstance = this.connectEscrowInstance(escrowInstance.address, this.importerSigner);
    console.log("token balance on contract is : " + await this.getTokenBalance(escrowInstance));

    // Sets a deal tokenPrice = 5ETH, buyBackPrice = 7ETH, holder will transfer to financer after payment
    await escrowInstance.setTokenDeal(this.ethToWei(5), this.ethToWei(7), this.financerPublicAddress);
    var deal = await this.getTokenDeal(escrowInstance);
    console.log("[DEAL] price: ", deal[0], ", buyBackprice: ", deal[1], ", token transferred to: ", deal[2]);
    console.log("Current Holder: ", await escrowInstance.holder());
    this.sendEther(this.financerPublicAddress, escrowInstance.address, 5, this.financerPrivateKey);
    console.log("Current holder", await escrowInstance.holder());
    this.sendEther(this.importerPublicAddress, escrowInstance.address, 7, this.importerPrivateKey);

    console.log("Current holder", await escrowInstance.holder());
    console.log("Beneficiary", await escrowInstance.beneficiary());

    console.log("Current owner of token is: " + await this.ownerOfToken(this.tokenID));
    await this.sendRelease(escrowInstance);
    console.log("token balance on contract is : " + await this.getTokenBalance(escrowInstance));
    console.log("Current owner of token is: " + await this.ownerOfToken(this.tokenID));

    // Important to connect to token registry as LSP to call burnToken!! And use await.
    this.connectTokenRegistry(this.tokenRegistry.address, this.LSPSigner);
    await this.burnToken(this.tokenID);
  }

  catch (e) {
    console.log(e);
  }
}

}

export var tm= new token_manager();
