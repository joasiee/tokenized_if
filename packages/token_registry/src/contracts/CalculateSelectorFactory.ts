/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { CalculateSelector } from "./CalculateSelector";

export class CalculateSelectorFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<CalculateSelector> {
    return super.deploy(overrides || {}) as Promise<CalculateSelector>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CalculateSelector {
    return super.attach(address) as CalculateSelector;
  }
  connect(signer: Signer): CalculateSelectorFactory {
    return super.connect(signer) as CalculateSelectorFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CalculateSelector {
    return new Contract(address, _abi, signerOrProvider) as CalculateSelector;
  }
}

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "calculateSelector",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610283806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063bb71eb3b14610030575b600080fd5b61003861008c565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6000808073ffffffffffffffffffffffffffffffffffffffff1663e366ab30905060e01b8173ffffffffffffffffffffffffffffffffffffffff166374bbb350905060e01b8273ffffffffffffffffffffffffffffffffffffffff16639d23c4c7905060e01b8373ffffffffffffffffffffffffffffffffffffffff1663200d2ed2905060e01b8473ffffffffffffffffffffffffffffffffffffffff1663e534155d905060e01b8573ffffffffffffffffffffffffffffffffffffffff166338af3eed905060e01b8673ffffffffffffffffffffffffffffffffffffffff16630cb258b7905060e01b8773ffffffffffffffffffffffffffffffffffffffff1663d4b56610905060e01b8873ffffffffffffffffffffffffffffffffffffffff16631fe2b08a905060e01b8973ffffffffffffffffffffffffffffffffffffffff1663a03fa7e3905060e01b8a73ffffffffffffffffffffffffffffffffffffffff166303f0736d905060e01b8b73ffffffffffffffffffffffffffffffffffffffff16635a87db75905060e01b8c73ffffffffffffffffffffffffffffffffffffffff1663150b7a02905060e01b1818181818181818181818189150509056fea265627a7a72315820e23d25f4e2daa75b801443745eaffd62231ea91e3291f13886ff342771e5fcfd64736f6c63430005100032";
