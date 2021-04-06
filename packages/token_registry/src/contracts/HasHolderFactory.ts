/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { HasHolder } from "./HasHolder";

export class HasHolderFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HasHolder {
    return new Contract(address, _abi, signerOrProvider) as HasHolder;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address"
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
        name: "previousHolder",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newHolder",
        type: "address"
      }
    ],
    name: "HolderChanged",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "holder",
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
  }
];
