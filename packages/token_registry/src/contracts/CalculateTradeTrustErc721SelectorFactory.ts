/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { CalculateTradeTrustErc721Selector } from "./CalculateTradeTrustErc721Selector";

export class CalculateTradeTrustErc721SelectorFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<CalculateTradeTrustErc721Selector> {
    return super.deploy(overrides || {}) as Promise<
      CalculateTradeTrustErc721Selector
    >;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CalculateTradeTrustErc721Selector {
    return super.attach(address) as CalculateTradeTrustErc721Selector;
  }
  connect(signer: Signer): CalculateTradeTrustErc721SelectorFactory {
    return super.connect(signer) as CalculateTradeTrustErc721SelectorFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CalculateTradeTrustErc721Selector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CalculateTradeTrustErc721Selector;
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
  "0x608060405234801561001057600080fd5b5061012a806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063bb71eb3b14602d575b600080fd5b60336087565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6000808073ffffffffffffffffffffffffffffffffffffffff1663412664ae905060e01b8173ffffffffffffffffffffffffffffffffffffffff16638a7d124b905060e01b8273ffffffffffffffffffffffffffffffffffffffff1663150b7a02905060e01b18189150509056fea265627a7a723158205cf745f570835db456ac07b0b6e935282a903f9ce876b2f425adb299fc864b3964736f6c63430005100032";
