export { TitleEscrowFactory } from "./contracts/TitleEscrowFactory";
export { TradeTrustErc721Factory } from "./contracts/TradeTrustErc721Factory";
export { TitleEscrowCreatorFactory } from "./contracts/TitleEscrowCreatorFactory";
export { getTitleEscrowCreatorAddress } from "./config";

import { TradeTrustErc721 } from "../types/TradeTrustErc721";
import { TitleEscrowCreator } from "../types/TitleEscrowCreator";
import { TitleEscrowFactory, TradeTrustErc721Factory, TitleEscrowCreatorFactory } from "./index";
import { Wallet, providers, getDefaultProvider } from "ethers";
import { TitleEscrow } from "./contracts/TitleEscrow";

var tokenRegistry: TradeTrustErc721;
var titleEscrowFactory: TitleEscrowCreator;

const url = "http://172.20.96.1:7545";
const provider = new providers.JsonRpcProvider(url);

// Getting the accounts
const LSPPrivateKey = provider.getSigner(0);
const LSPpublicAddress = "0xBfed710BFE55f8Da0cAE9e764C0bD280b65F624f";
const importerPrivateKey = provider.getSigner(1);
const importerPublicAddress = "0xCB64d22249298d05664291aF45e7c63d749A1FbB";


// Ropsten related stuff
/*
//const API_KEY = "KKQGPV4TGV17WWAQQREJCA9A6TJ5Z1CK6I";
//const ropstenProvider = getDefaultProvider("ropsten");
//const ropstenProvider = providers.getDefaultProvider("ropsten", {etherscan: API_KEY});
const LSPPrivateKey = new Wallet("0x5485ebeeee4e87ee89aba34834d406172f83271df356fd8ad1acbf40538b3b9d", ropstenProvider);
const LSPpublicAddress = "0xE6235C71b5f8CD01406e806BFc0aDFBDA8aDc936";
const importerPrivateKey = new Wallet("0x33f68e849850edc3ea1a85280196db68ea086c2cd8a42c8d6425f05b528479b9", ropstenProvider);
const importerPublicAddress = "0x94289E3fB264f586c1Ef3eb9525340707f820fC5";
*/

const tokenRegistryFactory = new TradeTrustErc721Factory(LSPPrivateKey);
const tokenId = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";

async function setupTokenRegistry() {
  try {
    tokenRegistry = await tokenRegistryFactory.deploy("MY_TOKEN_REGISTRY", "MTR");
    console.log("Deploying token registry");
  }
  catch (e) {
    console.log(e);
  }
}

async function createToken(escrowInstance: TitleEscrow) {
  try {
    await tokenRegistry["safeMint(address,uint256)"](escrowInstance.address, tokenId);
  }
  catch (e) {
    console.log(e);
  }

}
async function deployTitleEscrow(beneficiary: string, holder: string) {
  var instance;
  try {
    const factory = new TitleEscrowFactory(LSPPrivateKey);
    instance = await factory.deploy(tokenRegistry.address, beneficiary, holder, beneficiary);
    console.log("executing deploy title escrow");
  }
  catch (e) {
    console.log(e);
  }
  return instance;
}


async function main() {
  console.log("Hello world");
  try {
    await setupTokenRegistry();
    var escrowInstance = await deployTitleEscrow(LSPpublicAddress, LSPpublicAddress);
    if (escrowInstance != null) {
      createToken(escrowInstance);
      var beneficiary = await escrowInstance.beneficiary();
      var holder = await escrowInstance.holder();
      console.log("beneficiary is: " + beneficiary);
      console.log("holder is: " + holder);
    }

    var escrowInstance2 = await deployTitleEscrow(importerPublicAddress, importerPublicAddress);
    console.log("Deployed escrow instance 2");
    console.log("Current owner of token is: " + await tokenRegistry["ownerOf(uint256)"](tokenId));

    if (escrowInstance != null && escrowInstance2 != null) {
      console.log("balance: " + await tokenRegistry["balanceOf(address)"](escrowInstance.address));
      console.log("transferring");
      await escrowInstance.transferTo(escrowInstance2.address);
      console.log("balance: " + await tokenRegistry["balanceOf(address)"](escrowInstance.address));
      console.log("Current owner of token is: " + await tokenRegistry["ownerOf(uint256)"](tokenId));
      console.log(await escrowInstance2.holder());
    }
  }
  catch (e) {
    console.log(e);
  }
}


main();


