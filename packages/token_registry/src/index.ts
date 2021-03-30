export { TitleEscrowFactory } from "./contracts/TitleEscrowFactory";
export { TradeTrustErc721Factory } from "./contracts/TradeTrustErc721Factory";
export { TitleEscrowCreatorFactory } from "./contracts/TitleEscrowCreatorFactory";
export { getTitleEscrowCreatorAddress } from "./config";

import { TradeTrustErc721 } from "../types/TradeTrustErc721";
import { TitleEscrowCreator } from "../types/TitleEscrowCreator";
import { TitleEscrowFactory, TradeTrustErc721Factory, TitleEscrowCreatorFactory } from "./index";
import { Wallet, providers, getDefaultProvider, ethers, Contract} from "ethers";
import { TitleEscrow } from "./contracts/TitleEscrow";
import Web3 from "web3";

var tokenRegistry: TradeTrustErc721;
var titleEscrowFactory: TitleEscrowCreator;

const url = "http://172.19.16.1:7545";
const provider = new providers.JsonRpcProvider(url);

//const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(url));


// Getting the accounts
web3.eth.getAccounts().then(console.log);



async function blaa() {
  try {
    let accounts;
    web3.eth.getAccounts().then(function(response) { accounts = response; console.log(accounts[0]); });
  }
  catch (e) {
    console.log(e);
  }
}



const LSPSigner = provider.getSigner(0);
const importerSigner = provider.getSigner(1);
const financerSigner = provider.getSigner(2);


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




const tokenRegistryFactory = new TradeTrustErc721Factory(LSPSigner);
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
    const factory = new TitleEscrowFactory(LSPSigner);
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
    let importerPublicAddress = await importerSigner.getAddress();
    let financerPublicAddress = await financerSigner.getAddress();

   

    
    var escrowInstance = await deployTitleEscrow(importerPublicAddress, importerPublicAddress);
    if (escrowInstance != null) {
      createToken(escrowInstance);
      var beneficiary = await escrowInstance.beneficiary();
      var holder = await escrowInstance.holder();
      console.log("beneficiary is: " + beneficiary);
      console.log("holder is: " + holder);
    }

    var escrowInstance2 = await deployTitleEscrow(financerPublicAddress, financerPublicAddress);
    console.log("Deployed escrow instance 2");
    console.log("Current owner of token is: " + await tokenRegistry["ownerOf(uint256)"](tokenId));

    if (escrowInstance != null && escrowInstance2 != null) {
      //escrowInstance = TitleEscrowFactory.connect(escrowInstance.address, importerSigner);
      //escrowInstance = TitleEscrowFactory.connect("0x507D2ceA921E20E85cA58aa2AaF09DE65e127db6", importerSigner);
      console.log("balance: " + await tokenRegistry["balanceOf(address)"](escrowInstance.address));

      console.log(escrowInstance.address);
      //await escrowInstance.setTokenPrice(5);
      //await escrowInstance.getTokenPrice().then(x => console.log(x));

      //await tokenRegistry.setTokenPrice(tokenId, 20);

      //console.log(web3.utils.fromWei((await tokenRegistry.getTokenPrice(tokenId)).toString()));
      //console.log(await tokenRegistry.getTokenPrice(tokenId));

      //console.log(tokenRegistry.address);

      //var blabla = TradeTrustErc721Factory.connect("0x953d45Df76905E92A02b371424C287D5C79353d8", importerSigner);
      //await blabla["setTokenPrice(uint256,uint256)"](tokenId, 5);
      
      //console.log(await blabla["getTokenPrice(uint256)"](tokenId));
      

      

      /*
      console.log("transferring");
      await escrowInstance.transferTo(escrowInstance2.address);
      console.log("balance: " + await tokenRegistry["balanceOf(address)"](escrowInstance.address));
      console.log("Current owner of token is: " + await tokenRegistry["ownerOf(uint256)"](tokenId));
      console.log(await escrowInstance2.holder());

      */
  
      //var fs = require('fs');
      //var erc721 = JSON.parse(fs.readFileSync("../build/contracts/ERC721.json"));
      //var abi = erc721.abi

      //console.log(abi);
      

      //var fs = require('fs');
      //var jsonFile = '../build/contracts/ERC721.json';
      //var parsed= JSON.parse(fs.readFileSync(jsonFile));
      //var abi = parsed.abi;

      //const yourContract = new web3.eth.Contract(abi, tokenRegistry.address);
      

      //var extraData =  await yourContract.methods.setTokenPrice(tokenId, "7");

      //var contract_abi = web3.eth.abi.encodeFunctionSignature("setTokenPrice(uint256,uint256)");
      //var parameters = web3.eth.abi.encodeParameters(['uint256','uint256'], [tokenId, 3]);
      
      //var data_test = web3.eth.abi.encodeFunctionCall(abi, ["1", "2"]);
      //console.log(data_test);

      /*
      var extraData = web3.eth.abi.encodeFunctionCall({
        name: 'setTokenPrice',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'tokenID'
        },{
            type: 'uint256',
            name: 'price'
        }]
    
      }
    , ['0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3', '7']);
    */

  var extraData = web3.eth.abi.encodeFunctionCall({
    name: 'setTokenPrice',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'price'
    }]

  }
, ['7']);

console.log(extraData);


    const nonce = await web3.eth.getTransactionCount(financerPublicAddress, 'latest'); 

    const transaction = {
      'to': escrowInstance.address,
      'value': 5000000000000000000, // 5 ETH  value: web3.toWei(EtherAmount, 'ether')//EtherAmount=>how much ether you want to move
      'gas': 5000000, 
      'gasLimit': 5000000,
      'nonce': nonce,
      //'data' : extraData
      // optional data field to send message or execute smart contract
     };
     
     

      
       // need to connect AS importer before setting token price
      escrowInstance = TitleEscrowFactory.connect(escrowInstance.address, importerSigner);
      
      
      
      await escrowInstance.setTokenDeal(web3.utils.toWei('5','ether'), web3.utils.toWei('7','ether'), financerPublicAddress);
      console.log("Token price is: ", await escrowInstance.getTokenPrice());

      let bal = (await escrowInstance.getBalance())._hex;
      console.log(web3.utils.fromWei(bal));

    


      console.log(await escrowInstance.getTokenDeal());
      const signedTx = await web3.eth.accounts.signTransaction(transaction, "5da13d12265521d67dc19146cc23ea51f65885a43b14d54a69a77262dee71291");
     
      
      console.log("HOLDER", await escrowInstance.holder());
      await web3.eth.sendSignedTransaction(signedTx.rawTransaction!, function(error, hash) {
          if (!error) {
            console.log("The hash of your transaction is: ", hash);
          } else {
            console.log("Something went wrong while submitting your transaction:", error)
          }
         });



         console.log("HOLDER", await escrowInstance.holder());

         escrowInstance = TitleEscrowFactory.connect(escrowInstance.address, financerSigner);




         const nonce2 = await web3.eth.getTransactionCount(importerPublicAddress, 'latest'); 

         const transaction2 = {
           'to': escrowInstance.address,
           'value': 7000000000000000000, // 7 ETH  value: web3.toWei(EtherAmount, 'ether')//EtherAmount=>how much ether you want to move
           'gas': 5000000, 
           'gasLimit': 5000000,
           'nonce': nonce2,
           //'data' : extraData
           // optional data field to send message or execute smart contract
          };


          const signedTx2 = await web3.eth.accounts.signTransaction(transaction2, "7b7201b55d3942b2939048e08d2a1fe793f3ee4e79045a34d6b3354265a9aa8b");

         await web3.eth.sendSignedTransaction(signedTx2.rawTransaction!, function(error, hash) {
          if (!error) {
            console.log("The hash of your transaction is: ", hash);
          } else {
            console.log("Something went wrong while submitting your transaction:", error)
          }
         });

         console.log("BOUGHT AGAIN");
         console.log("HOLDER", await escrowInstance.holder());
         console.log("Beneficiary", await escrowInstance.beneficiary());

         


     
         

      
      }
     
 
 
       

    }
  

    
  
  catch (e) {
    console.log(e);
  }
}



main();



