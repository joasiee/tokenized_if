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

// tokenRegistryFactory, used to deploy token registry.
const tokenRegistryFactory = new TradeTrustErc721Factory(LSPSigner);

// tokenId, should be the hash of the document.
const tokenID = "0x624d0d7ae6f44d41d368d8280856dbaac6aa29fb3b35f45b80a7c1c90032eeb3";


/**************** **************** **************** 
**************** Useful Functions  *******************
**************** **************** **************** */

// Sets up public addresses for importer and financer.
async function setupPublicAddresses() {
  try {
    importerPublicAddress = await importerSigner.getAddress();
    financerPublicAddress = await financerSigner.getAddress();
    }
  catch (e) {
    console.log(e);
  }
}


// Printing all accounts from Ganache.
function printAllAccounts() {
  web3.eth.getAccounts().then(console.log);
}

// Helper function if we need it to get a single account.
async function getSingleAccount(index:number) {
  try {
    let accounts;
    web3.eth.getAccounts().then(function(response) { 
      accounts = response; console.log(accounts[index]); 
    });
  }
  catch (e) {
    console.log(e);
  }
}

// Sets up the Token Registry
async function setupTokenRegistry() {
  try {
    tokenRegistry = await tokenRegistryFactory.deploy("MY_TOKEN_REGISTRY", "MTR");
    console.log("Deploying token registry");
  }
  catch (e) {
    console.log(e);
  }
}

// This will create a token and put it in a given contract, the escrowInstance.
async function createToken(escrowInstance: TitleEscrow, tokenID: ethers.BigNumberish) {
  try {
    await tokenRegistry["safeMint(address,uint256)"](escrowInstance.address, tokenID);
  }
  catch (e) {
    console.log(e);
  }
}

// Deploys the title escrow contract on the blockchain with a given beneficiary and holder.
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

// The LSP deploys the importer escrow contract on the blockchain with importer as owner.
// A token will de made from the tokenID and placed in this contract.
async function deployImporterEscrow(tokenID : ethers.BigNumberish) {
  var escrowInstance;
  try {
      escrowInstance = await deployTitleEscrow(importerPublicAddress, importerPublicAddress);
      if (escrowInstance != null) {
        createToken(escrowInstance, tokenID);
      }  
  }
  catch (e) {
    console.log(e);
  }
  return escrowInstance;
}

// Returns the owner of a token, given a tokenID.
async function ownerOfToken(tokenID : ethers.BigNumberish) {
  var result;
  try {
    result = await tokenRegistry["ownerOf(uint256)"](tokenID);
  }
  catch (e) {
    console.log(e);
  }
  return result;
}




/**************** **************** **************** 
**************** Main  *******************
**************** **************** **************** */

async function main() {
  console.log("Running main");
  try {
    await setupPublicAddresses();
    await setupTokenRegistry();
    // Deploys an escrow contract as owner the importer.
    var escrowInstance = await deployImporterEscrow(tokenID);


    var escrowInstance2 = await deployTitleEscrow(financerPublicAddress, financerPublicAddress);
    console.log("Deployed escrow instance 2");
    console.log("Current owner of token is: " + await tokenRegistry["ownerOf(uint256)"](tokenID));

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



