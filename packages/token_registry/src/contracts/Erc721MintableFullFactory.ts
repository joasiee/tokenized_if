/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { Erc721MintableFull } from "./Erc721MintableFull";

export class Erc721MintableFullFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides
  ): Promise<Erc721MintableFull> {
    return super.deploy(name, symbol, overrides || {}) as Promise<
      Erc721MintableFull
    >;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): Erc721MintableFull {
    return super.attach(address) as Erc721MintableFull;
  }
  connect(signer: Signer): Erc721MintableFullFactory {
    return super.connect(signer) as Erc721MintableFullFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Erc721MintableFull {
    return new Contract(address, _abi, signerOrProvider) as Erc721MintableFull;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "MinterAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "MinterRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "addMinter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "isMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceMinter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200336038038062003360833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b5060405250505081818181620001d16301ffc9a760e01b6200027760201b60201c565b620001e96380ac58cd60e01b6200027760201b60201c565b62000209620001fd6200038060201b60201c565b6200038860201b60201c565b6200022163780e9d6360e01b6200027760201b60201c565b81600a908051906020019062000239929190620005ad565b5080600b908051906020019062000252929190620005ad565b506200026b635b5e139f60e01b6200027760201b60201c565b5050505050506200065c565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000314576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600033905090565b620003a3816005620003e960201b620025bb1790919060201c565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b620003fb8282620004cd60201b60201c565b156200046f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000556576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806200333e6022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620005f057805160ff191683800117855562000621565b8280016001018555821562000621579182015b828111156200062057825182559160200191906001019062000603565b5b50905062000630919062000634565b5090565b6200065991905b80821115620006555760008160009055506001016200063b565b5090565b90565b612cd2806200066c6000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c806370a08231116100b8578063a14481941161007c578063a144819414610783578063a22cb465146107e9578063aa271e1a14610839578063b88d4fde14610895578063c87b56dd1461099a578063e985e9c514610a4157610142565b806370a082311461055d5780638832e6e3146105b557806395d89b41146106b2578063983b2d5614610735578063986502751461077957610142565b806323b872dd1161010a57806323b872dd146103095780632f745c591461037757806340c10f19146103d957806342842e0e1461043f5780634f6ccce7146104ad5780636352211e146104ef57610142565b806301ffc9a71461014757806306fdde03146101ac578063081812fc1461022f578063095ea7b31461029d57806318160ddd146102eb575b600080fd5b6101926004803603602081101561015d57600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610abd565b604051808215151515815260200191505060405180910390f35b6101b4610b24565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101f45780820151818401526020810190506101d9565b50505050905090810190601f1680156102215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61025b6004803603602081101561024557600080fd5b8101908080359060200190929190505050610bc6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102e9600480360360408110156102b357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c61565b005b6102f3610e48565b6040518082815260200191505060405180910390f35b6103756004803603606081101561031f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610e55565b005b6103c36004803603604081101561038d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ecb565b6040518082815260200191505060405180910390f35b610425600480360360408110156103ef57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f8a565b604051808215151515815260200191505060405180910390f35b6104ab6004803603606081101561045557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611005565b005b6104d9600480360360208110156104c357600080fd5b8101908080359060200190929190505050611025565b6040518082815260200191505060405180910390f35b61051b6004803603602081101561050557600080fd5b81019080803590602001909291905050506110a5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61059f6004803603602081101561057357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061116d565b6040518082815260200191505060405180910390f35b610698600480360360608110156105cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561061257600080fd5b82018360208201111561062457600080fd5b8035906020019184600183028401116401000000008311171561064657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611242565b604051808215151515815260200191505060405180910390f35b6106ba6112bf565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106fa5780820151818401526020810190506106df565b50505050905090810190601f1680156107275780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107776004803603602081101561074b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611361565b005b6107816113d2565b005b6107cf6004803603604081101561079957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506113e4565b604051808215151515815260200191505060405180910390f35b610837600480360360408110156107ff57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080351515906020019092919050505061145f565b005b61087b6004803603602081101561084f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611617565b604051808215151515815260200191505060405180910390f35b610998600480360360808110156108ab57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561091257600080fd5b82018360208201111561092457600080fd5b8035906020019184600183028401116401000000008311171561094657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611634565b005b6109c6600480360360208110156109b057600080fd5b81019080803590602001909291905050506116ac565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610a065780820151818401526020810190506109eb565b50505050905090810190601f168015610a335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610aa360048036036040811015610a5757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117bf565b604051808215151515815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6060600a8054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bbc5780601f10610b9157610100808354040283529160200191610bbc565b820191906000526020600020905b815481529060010190602001808311610b9f57829003601f168201915b5050505050905090565b6000610bd182611853565b610c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612b7a602c913960400191505060405180910390fd5b6002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610c6c826110a5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610cf3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612c206021913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610d126118c5565b73ffffffffffffffffffffffffffffffffffffffff161480610d415750610d4081610d3b6118c5565b6117bf565b5b610d96576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526038815260200180612a9e6038913960400191505060405180910390fd5b826002600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b6000600880549050905090565b610e66610e606118c5565b826118cd565b610ebb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180612c416031913960400191505060405180910390fd5b610ec68383836119c1565b505050565b6000610ed68361116d565b8210610f2d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b8152602001806129f1602b913960400191505060405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610f7757fe5b9060005260206000200154905092915050565b6000610f9c610f976118c5565b611617565b610ff1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180612b296030913960400191505060405180910390fd5b610ffb83836119e5565b6001905092915050565b61102083838360405180602001604052806000815250611634565b505050565b600061102f610e48565b8210611086576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612c72602c913960400191505060405180910390fd5b6008828154811061109357fe5b90600052602060002001549050919050565b6000806001600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611164576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612b006029913960400191505060405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156111f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612ad6602a913960400191505060405180910390fd5b61123b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611a06565b9050919050565b600061125461124f6118c5565b611617565b6112a9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180612b296030913960400191505060405180910390fd5b6112b4848484611a14565b600190509392505050565b6060600b8054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113575780601f1061132c57610100808354040283529160200191611357565b820191906000526020600020905b81548152906001019060200180831161133a57829003601f168201915b5050505050905090565b61137161136c6118c5565b611617565b6113c6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180612b296030913960400191505060405180910390fd5b6113cf81611a85565b50565b6113e26113dd6118c5565b611adf565b565b60006113f66113f16118c5565b611617565b61144b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180612b296030913960400191505060405180910390fd5b6114558383611b39565b6001905092915050565b6114676118c5565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611508576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4552433732313a20617070726f766520746f2063616c6c65720000000000000081525060200191505060405180910390fd5b80600460006115156118c5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff166115c26118c5565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b600061162d826005611b5790919063ffffffff16565b9050919050565b61164561163f6118c5565b836118cd565b61169a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180612c416031913960400191505060405180910390fd5b6116a684848484611c35565b50505050565b60606116b782611853565b61170c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180612bf1602f913960400191505060405180910390fd5b600c60008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156117b35780601f10611788576101008083540402835291602001916117b3565b820191906000526020600020905b81548152906001019060200180831161179657829003601f168201915b50505050509050919050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000806001600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b600033905090565b60006118d882611853565b61192d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612a72602c913960400191505060405180910390fd5b6000611938836110a5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806119a757508373ffffffffffffffffffffffffffffffffffffffff1661198f84610bc6565b73ffffffffffffffffffffffffffffffffffffffff16145b806119b857506119b781856117bf565b5b91505092915050565b6119cc838383611ca7565b6119d68382611f02565b6119e082826120a0565b505050565b6119ef8282612167565b6119f982826120a0565b611a028161237f565b5050565b600081600001549050919050565b611a1e83836119e5565b611a2b60008484846123cb565b611a80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180612a1c6032913960400191505060405180910390fd5b505050565b611a998160056125bb90919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b611af381600561269690919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b611b53828260405180602001604052806000815250611a14565b5050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611bde576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612ba66022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b611c408484846119c1565b611c4c848484846123cb565b611ca1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180612a1c6032913960400191505060405180910390fd5b50505050565b8273ffffffffffffffffffffffffffffffffffffffff16611cc7826110a5565b73ffffffffffffffffffffffffffffffffffffffff1614611d33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612bc86029913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611db9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180612a4e6024913960400191505060405180910390fd5b611dc281612753565b611e09600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612811565b611e50600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612834565b816001600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000611f5a6001600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905061284a90919063ffffffff16565b9050600060076000848152602001908152602001600020549050818114612047576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110611fc757fe5b9060005260206000200154905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020838154811061201f57fe5b9060005260206000200181905550816007600083815260200190815260200160002081905550505b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480919060019003612099919061299f565b5050505050565b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506007600083815260200190815260200160002081905550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190915055505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561220a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4552433732313a206d696e7420746f20746865207a65726f206164647265737381525060200191505060405180910390fd5b61221381611853565b15612286576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000081525060200191505060405180910390fd5b816001600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061231f600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612834565b808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505090600182039060005260206000200160009091929091909150555050565b60006123ec8473ffffffffffffffffffffffffffffffffffffffff16612894565b6123f957600190506125b3565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a0261241f6118c5565b8887876040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156124db5780820151818401526020810190506124c0565b50505050905090810190601f1680156125085780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561252a57600080fd5b505af115801561253e573d6000803e3d6000fd5b505050506040513d602081101561255457600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b6125c58282611b57565b15612638576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6126a08282611b57565b6126f5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b596021913960400191505060405180910390fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600073ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461280e5760006002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b6128296001826000015461284a90919063ffffffff16565b816000018190555050565b6001816000016000828254019250508190555050565b600061288c83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506128df565b905092915050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f91506000801b82141580156128d65750808214155b92505050919050565b600083831115829061298c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612951578082015181840152602081019050612936565b50505050905090810190601f16801561297e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b8154818355818111156129c6578183600052602060002091820191016129c591906129cb565b5b505050565b6129ed91905b808211156129e95760008160009055506001016129d1565b5090565b9056fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c654552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420697320746865207a65726f20616464726573734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e6473a265627a7a723158200f43eb39ca0925ade310d0c8e9cbaaeb3b2c5eaf63eb336cfb1fafd27af246b864736f6c63430005100032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
