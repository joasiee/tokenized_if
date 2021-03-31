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

// Variables
var tokenRegistry: TradeTrustErc721;
var titleEscrowFactory: TitleEscrowCreator;

// Setting up ganache connections
const ganacheURL = "http://172.19.16.1:7545";
const provider = new providers.JsonRpcProvider(ganacheURL);
var web3 = new Web3(new Web3.providers.HttpProvider(ganacheURL));

// Signers, abstraction of ethereum account to sign messages/transactions.
const LSPSigner = provider.getSigner(0);
const importerSigner = provider.getSigner(1);
const financerSigner = provider.getSigner(2);

// Public addresses for importer and financer.
var importerPublicAddress: string;
var financerPublicAddress: string;

// Private keys
var importerPrivateKey = "7b7201b55d3942b2939048e08d2a1fe793f3ee4e79045a34d6b3354265a9aa8b";
var financerPrivateKey = "5da13d12265521d67dc19146cc23ea51f65885a43b14d54a69a77262dee71291";

// tokenId, should be the hash of the document.
const tokenID = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";

// tokenRegistryFactory, used to deploy token registry.
const tokenRegistryFactory = new TradeTrustErc721Factory(LSPSigner);




/**************** **************** **************** 
**************** Useful Functions  *******************
**************** **************** **************** */

// Sets up public addresses for importer and financer.
export async function setupPublicAddresses() {
  try {
    importerPublicAddress = await importerSigner.getAddress();
    financerPublicAddress = await financerSigner.getAddress();
  }
  catch (e) {
    console.log(e);
  }
}

// Printing all accounts from Ganache.
export function printAllAccounts() {
  web3.eth.getAccounts().then(console.log);
}

// Helper function if we need it to get a single account.
async function getSingleAccount(index: number) {
  try {
    let accounts;
    web3.eth.getAccounts().then(function (response) {
      accounts = response; console.log(accounts[index]);
    });
  }
  catch (e) {
    console.log(e);
  }
}

// Sets up the Token Registry
export async function setupTokenRegistry() {
  try {
    tokenRegistry = await tokenRegistryFactory.deploy("MY_TOKEN_REGISTRY", "MTR");
    console.log("Deploying token registry");
  }
  catch (e) {
    console.log(e);
  }
}

// This will create a token and put it in a given contract, the escrowInstance.
export async function createToken(escrowInstance: TitleEscrow, tokenID: ethers.BigNumberish) {
  try {
    await tokenRegistry["safeMint(address,uint256)"](escrowInstance.address, tokenID);
  }
  catch (e) {
    console.log(e);
  }
}

// Deploys the title escrow contract on the blockchain with a given beneficiary and holder.
export async function deployTitleEscrow(beneficiary: string, holder: string) {
  var instance;
  try {
    const factory = new TitleEscrowFactory(LSPSigner);
    instance = await factory.deploy(tokenRegistry.address, beneficiary, holder, beneficiary);
    console.log("executing deploy title escrow");
  }
  catch (e) {
    console.log(e);
  }
  return instance;
}

// The LSP deploys the importer escrow contract on the blockchain with importer as owner.
// A token will de made from the tokenID and placed in this contract.
export async function deployImporterEscrow(tokenID: ethers.BigNumberish): Promise<TitleEscrow> {
  var escrowInstance;
  try {
    escrowInstance = await deployTitleEscrow(importerPublicAddress, importerPublicAddress);
    if (escrowInstance) {
      await createToken(escrowInstance, tokenID);
    }
    else throw new Error("deployImporterEscrow: escrowInstance creation encountered a problem");
  }
  catch (e) {
    console.log(e);
    throw (e);
  }
  return escrowInstance;
}

// Returns the owner of a token, given a tokenID.
export async function ownerOfToken(tokenID: ethers.BigNumberish) {
  var result;
  try {
    result = await tokenRegistry["ownerOf(uint256)"](tokenID);
  }
  catch (e) {
    console.log(e);
  }
  return result;
}

// Sleep helper function. Not used at the moment, leaving it just in case.
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Use this function to connect to an existing titleEscrow on the blockchain.
// connectEscrowInstance("0x....", importerSigner).
function connectEscrowInstance(address: string, signerOrProvider: ethers.Signer | providers.Provider): TitleEscrow {
  var escrowInstance;
  escrowInstance = TitleEscrowFactory.connect(address, signerOrProvider);
  return escrowInstance;
}

// Use this function to connect to an existing TokenRegistry on the blockchain.
export function connectTokenRegistry(address: string, signerOrProvider: ethers.Signer | providers.Provider) {
  tokenRegistry = TradeTrustErc721Factory.connect(address, signerOrProvider);
  return tokenRegistry;
}

// Gets the token balance from a given TitleEscrow.
export async function getTokenBalance(escrowInstance: TitleEscrow) {
  var result;
  result = await tokenRegistry["balanceOf(address)"](escrowInstance.address);
  return result;
}

// Convert ether to wei.
export function ethToWei(eth: string | number): string {
  eth = eth.toString()
  return web3.utils.toWei(eth, 'ether');
}

// Sends ether from an address to another address.
export async function sendEther(from_address: string, to_address: string, amount_ether: string | number, priv_key: string) {
  const nonce = await web3.eth.getTransactionCount(from_address, 'latest');
  const transaction = {
    'to': to_address,
    'value': ethToWei(amount_ether),
    'gas': 5000000,
    'gasLimit': 5000000,
    'nonce': nonce,
  };
  const signedTx = await web3.eth.accounts.signTransaction(transaction, priv_key);
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction!, function (error, hash) {
    if (!error) {
      console.log("sent " + amount_ether + "ETH" + ", Hash of transaction is: ", hash);
    }
    else {
      console.log("Something went wrong with sendEther transaction:", error)
    }
  });
}

// Used to parse BigNumber, and hex to numberString.
export function parseBigNumber(number: ethers.BigNumber) {
  return web3.utils.hexToNumberString(number._hex);
}

// Retrieves tokenPrice and converts to ether amount.
export async function getTokenPrice(escrowInstance: TitleEscrow): Promise<string> {
  var price = await escrowInstance.getTokenPrice();
  return web3.utils.fromWei(parseBigNumber(price));
}

// Retrieves buyBackPrice and converts to ether amount.
export async function getTokenBuyBackPrice(escrowInstance: TitleEscrow): Promise<string> {
  var buyBackPrice = await escrowInstance.getBuyBackPrice();
  return web3.utils.fromWei(parseBigNumber(buyBackPrice));
}

// Retrieves the contract destination address. This is the address where the token transfers to, after payment.
export async function getContractDest(escrowInstance: TitleEscrow): Promise<string> {
  return await escrowInstance.getcontractDest();
}

// Gets the deal which includes price, buyBackPrice and the contract destination.
// It returns an array which contains the three variables.
export async function getTokenDeal(escrowInstance: TitleEscrow) {
  var deal = await escrowInstance.getTokenDeal();
  var price = web3.utils.fromWei(parseBigNumber(deal[0]));
  var buyBackPrice = web3.utils.fromWei(parseBigNumber(deal[1]));
  var to_addr = deal[2];
  return [price, buyBackPrice, to_addr];
}

// Returns the ether balance stored in a TitleEscrow.
export async function getETHBalance(escrowInstance: TitleEscrow) {
  var balance = (await escrowInstance.getBalance())._hex;
  return web3.utils.fromWei(balance);
}

/**************** **************** **************** 
**************** Main  *******************
      ** An example of the flow **
**************** **************** **************** */

async function main() {
  console.log("Running main");
  try {
    await setupPublicAddresses();
    await setupTokenRegistry();
    // Deploys an escrow contract as owner the importer.
    var escrowInstance = await deployImporterEscrow(tokenID);

    console.log("Current owner of token is: " + await ownerOfToken(tokenID));
    escrowInstance = connectEscrowInstance(escrowInstance.address, importerSigner);
    console.log("token balance on contract is : " + await getTokenBalance(escrowInstance));

    // Sets a deal tokenPrice = 5ETH, buyBackPrice = 7ETH, holder will transfer to financer after payment
    await escrowInstance.setTokenDeal(ethToWei(5), ethToWei(7), financerPublicAddress);
    var deal = await getTokenDeal(escrowInstance);
    console.log("[DEAL] price: ", deal[0], ", buyBackprice: ", deal[1], ", token transferred to: ", deal[2]);
    console.log("Current Holder: ", await escrowInstance.holder());
    sendEther(financerPublicAddress, escrowInstance.address, 5, financerPrivateKey);

    console.log("Current holder", await escrowInstance.holder());
    sendEther(importerPublicAddress, escrowInstance.address, 7, importerPrivateKey);

    console.log("Current holder", await escrowInstance.holder());
    console.log("Beneficiary", await escrowInstance.beneficiary());
  }

  catch (e) {
    console.log(e);
  }
}

main();



