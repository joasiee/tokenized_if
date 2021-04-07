/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface TitleEscrowInterface extends ethers.utils.Interface {
  functions: {
    "_tokenId()": FunctionFragment;
    "approvedBeneficiary()": FunctionFragment;
    "approvedHolder()": FunctionFragment;
    "approvedOwner()": FunctionFragment;
    "beneficiary()": FunctionFragment;
    "buyBackPrice()": FunctionFragment;
    "contractDest()": FunctionFragment;
    "holder()": FunctionFragment;
    "status()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "titleEscrowFactory()": FunctionFragment;
    "tokenPrice()": FunctionFragment;
    "tokenRegistry()": FunctionFragment;
    "setTokenDeal(uint256,uint256,address)": FunctionFragment;
    "getTokenDeal()": FunctionFragment;
    "getTokenPrice()": FunctionFragment;
    "getBuyBackPrice()": FunctionFragment;
    "getContractDest()": FunctionFragment;
    "getBalance()": FunctionFragment;
    "buyToken()": FunctionFragment;
    "buyBackToken()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "changeHolder(address)": FunctionFragment;
    "approveNewOwner(address)": FunctionFragment;
    "transferTo(address)": FunctionFragment;
    "transferToNewEscrow(address,address)": FunctionFragment;
    "approveNewTransferTargets(address,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "_tokenId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "approvedBeneficiary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approvedHolder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approvedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "beneficiary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyBackPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractDest",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "holder", values?: undefined): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "titleEscrowFactory",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenDeal",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenDeal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBuyBackPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractDest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buyToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyBackToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "changeHolder",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "approveNewOwner",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "transferTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferToNewEscrow",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approveNewTransferTargets",
    values: [string, string]
  ): string;

  decodeFunctionResult(functionFragment: "_tokenId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approvedBeneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approvedHolder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approvedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyBackPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractDest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "holder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "titleEscrowFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenDeal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenDeal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBuyBackPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractDest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyBackToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeHolder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transferTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferToNewEscrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveNewTransferTargets",
    data: BytesLike
  ): Result;

  events: {
    "HolderChanged(address,address)": EventFragment;
    "TitleCeded(address,address,uint256)": EventFragment;
    "TitleReceived(address,address,uint256)": EventFragment;
    "TransferOwnerApproval(uint256,address,address)": EventFragment;
    "TransferTitleEscrowApproval(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "HolderChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TitleCeded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TitleReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferOwnerApproval"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TransferTitleEscrowApproval"
  ): EventFragment;
}

export class TitleEscrow extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TitleEscrowInterface;

  functions: {
    _tokenId(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "_tokenId()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    approvedBeneficiary(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "approvedBeneficiary()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    approvedHolder(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "approvedHolder()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    approvedOwner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "approvedOwner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    beneficiary(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "beneficiary()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    buyBackPrice(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "buyBackPrice()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    contractDest(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "contractDest()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    holder(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "holder()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    status(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "status()"(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    titleEscrowFactory(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "titleEscrowFactory()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    tokenPrice(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "tokenPrice()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    tokenRegistry(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "tokenRegistry()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    setTokenDeal(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setTokenDeal(uint256,uint256,address)"(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getTokenDeal(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: string;
    }>;

    "getTokenDeal()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: string;
    }>;

    getTokenPrice(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getTokenPrice()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getBuyBackPrice(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getBuyBackPrice()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getContractDest(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getContractDest()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getBalance(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getBalance()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    buyToken(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "buyToken()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

    buyBackToken(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "buyBackToken()"(
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    changeHolder(
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "changeHolder(address)"(
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    approveNewOwner(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approveNewOwner(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferTo(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferTo(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferToNewEscrow(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferToNewEscrow(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    approveNewTransferTargets(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approveNewTransferTargets(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  _tokenId(overrides?: CallOverrides): Promise<BigNumber>;

  "_tokenId()"(overrides?: CallOverrides): Promise<BigNumber>;

  approvedBeneficiary(overrides?: CallOverrides): Promise<string>;

  "approvedBeneficiary()"(overrides?: CallOverrides): Promise<string>;

  approvedHolder(overrides?: CallOverrides): Promise<string>;

  "approvedHolder()"(overrides?: CallOverrides): Promise<string>;

  approvedOwner(overrides?: CallOverrides): Promise<string>;

  "approvedOwner()"(overrides?: CallOverrides): Promise<string>;

  beneficiary(overrides?: CallOverrides): Promise<string>;

  "beneficiary()"(overrides?: CallOverrides): Promise<string>;

  buyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "buyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  contractDest(overrides?: CallOverrides): Promise<string>;

  "contractDest()"(overrides?: CallOverrides): Promise<string>;

  holder(overrides?: CallOverrides): Promise<string>;

  "holder()"(overrides?: CallOverrides): Promise<string>;

  status(overrides?: CallOverrides): Promise<number>;

  "status()"(overrides?: CallOverrides): Promise<number>;

  /**
   * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
   */
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
   */
  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  titleEscrowFactory(overrides?: CallOverrides): Promise<string>;

  "titleEscrowFactory()"(overrides?: CallOverrides): Promise<string>;

  tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "tokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  tokenRegistry(overrides?: CallOverrides): Promise<string>;

  "tokenRegistry()"(overrides?: CallOverrides): Promise<string>;

  setTokenDeal(
    price: BigNumberish,
    price2: BigNumberish,
    dest: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setTokenDeal(uint256,uint256,address)"(
    price: BigNumberish,
    price2: BigNumberish,
    dest: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getTokenDeal(
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: string;
  }>;

  "getTokenDeal()"(
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: string;
  }>;

  getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "getTokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  getBuyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "getBuyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  getContractDest(overrides?: CallOverrides): Promise<string>;

  "getContractDest()"(overrides?: CallOverrides): Promise<string>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  "getBalance()"(overrides?: CallOverrides): Promise<BigNumber>;

  buyToken(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "buyToken()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  buyBackToken(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "buyBackToken()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  onERC721Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "onERC721Received(address,address,uint256,bytes)"(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  changeHolder(
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "changeHolder(address)"(
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  approveNewOwner(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approveNewOwner(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferTo(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferTo(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferToNewEscrow(
    newBeneficiary: string,
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferToNewEscrow(address,address)"(
    newBeneficiary: string,
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  approveNewTransferTargets(
    newBeneficiary: string,
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approveNewTransferTargets(address,address)"(
    newBeneficiary: string,
    newHolder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    _tokenId(overrides?: CallOverrides): Promise<BigNumber>;

    "_tokenId()"(overrides?: CallOverrides): Promise<BigNumber>;

    approvedBeneficiary(overrides?: CallOverrides): Promise<string>;

    "approvedBeneficiary()"(overrides?: CallOverrides): Promise<string>;

    approvedHolder(overrides?: CallOverrides): Promise<string>;

    "approvedHolder()"(overrides?: CallOverrides): Promise<string>;

    approvedOwner(overrides?: CallOverrides): Promise<string>;

    "approvedOwner()"(overrides?: CallOverrides): Promise<string>;

    beneficiary(overrides?: CallOverrides): Promise<string>;

    "beneficiary()"(overrides?: CallOverrides): Promise<string>;

    buyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "buyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    contractDest(overrides?: CallOverrides): Promise<string>;

    "contractDest()"(overrides?: CallOverrides): Promise<string>;

    holder(overrides?: CallOverrides): Promise<string>;

    "holder()"(overrides?: CallOverrides): Promise<string>;

    status(overrides?: CallOverrides): Promise<number>;

    "status()"(overrides?: CallOverrides): Promise<number>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    titleEscrowFactory(overrides?: CallOverrides): Promise<string>;

    "titleEscrowFactory()"(overrides?: CallOverrides): Promise<string>;

    tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenRegistry(overrides?: CallOverrides): Promise<string>;

    "tokenRegistry()"(overrides?: CallOverrides): Promise<string>;

    setTokenDeal(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setTokenDeal(uint256,uint256,address)"(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getTokenDeal(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: string;
    }>;

    "getTokenDeal()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: string;
    }>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBuyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getBuyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    getContractDest(overrides?: CallOverrides): Promise<string>;

    "getContractDest()"(overrides?: CallOverrides): Promise<string>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    "getBalance()"(overrides?: CallOverrides): Promise<BigNumber>;

    buyToken(overrides?: CallOverrides): Promise<void>;

    "buyToken()"(overrides?: CallOverrides): Promise<void>;

    buyBackToken(overrides?: CallOverrides): Promise<void>;

    "buyBackToken()"(overrides?: CallOverrides): Promise<void>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    changeHolder(newHolder: string, overrides?: CallOverrides): Promise<void>;

    "changeHolder(address)"(
      newHolder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    approveNewOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    "approveNewOwner(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferTo(newOwner: string, overrides?: CallOverrides): Promise<void>;

    "transferTo(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferToNewEscrow(
      newBeneficiary: string,
      newHolder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferToNewEscrow(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    approveNewTransferTargets(
      newBeneficiary: string,
      newHolder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "approveNewTransferTargets(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    HolderChanged(
      previousHolder: string | null,
      newHolder: string | null
    ): EventFilter;

    TitleCeded(
      _tokenRegistry: string | null,
      _to: string | null,
      _id: BigNumberish | null
    ): EventFilter;

    TitleReceived(
      _tokenRegistry: string | null,
      _from: string | null,
      _id: BigNumberish | null
    ): EventFilter;

    TransferOwnerApproval(
      _tokenid: BigNumberish | null,
      _from: string | null,
      _to: string | null
    ): EventFilter;

    TransferTitleEscrowApproval(
      newBeneficiary: string | null,
      newHolder: string | null
    ): EventFilter;
  };

  estimateGas: {
    _tokenId(overrides?: CallOverrides): Promise<BigNumber>;

    "_tokenId()"(overrides?: CallOverrides): Promise<BigNumber>;

    approvedBeneficiary(overrides?: CallOverrides): Promise<BigNumber>;

    "approvedBeneficiary()"(overrides?: CallOverrides): Promise<BigNumber>;

    approvedHolder(overrides?: CallOverrides): Promise<BigNumber>;

    "approvedHolder()"(overrides?: CallOverrides): Promise<BigNumber>;

    approvedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    "approvedOwner()"(overrides?: CallOverrides): Promise<BigNumber>;

    beneficiary(overrides?: CallOverrides): Promise<BigNumber>;

    "beneficiary()"(overrides?: CallOverrides): Promise<BigNumber>;

    buyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "buyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    contractDest(overrides?: CallOverrides): Promise<BigNumber>;

    "contractDest()"(overrides?: CallOverrides): Promise<BigNumber>;

    holder(overrides?: CallOverrides): Promise<BigNumber>;

    "holder()"(overrides?: CallOverrides): Promise<BigNumber>;

    status(overrides?: CallOverrides): Promise<BigNumber>;

    "status()"(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    titleEscrowFactory(overrides?: CallOverrides): Promise<BigNumber>;

    "titleEscrowFactory()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenRegistry()"(overrides?: CallOverrides): Promise<BigNumber>;

    setTokenDeal(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setTokenDeal(uint256,uint256,address)"(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getTokenDeal(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenDeal()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBuyBackPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "getBuyBackPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    getContractDest(overrides?: CallOverrides): Promise<BigNumber>;

    "getContractDest()"(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    "getBalance()"(overrides?: CallOverrides): Promise<BigNumber>;

    buyToken(overrides?: PayableOverrides): Promise<BigNumber>;

    "buyToken()"(overrides?: PayableOverrides): Promise<BigNumber>;

    buyBackToken(overrides?: PayableOverrides): Promise<BigNumber>;

    "buyBackToken()"(overrides?: PayableOverrides): Promise<BigNumber>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    changeHolder(newHolder: string, overrides?: Overrides): Promise<BigNumber>;

    "changeHolder(address)"(
      newHolder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    approveNewOwner(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approveNewOwner(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferTo(newOwner: string, overrides?: Overrides): Promise<BigNumber>;

    "transferTo(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferToNewEscrow(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferToNewEscrow(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    approveNewTransferTargets(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approveNewTransferTargets(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _tokenId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "_tokenId()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approvedBeneficiary(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "approvedBeneficiary()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approvedHolder(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "approvedHolder()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approvedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "approvedOwner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    beneficiary(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "beneficiary()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyBackPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "buyBackPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractDest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "contractDest()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    holder(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "holder()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    status(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "status()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC165-supportsInterface}.     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    titleEscrowFactory(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "titleEscrowFactory()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokenPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokenRegistry()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTokenDeal(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setTokenDeal(uint256,uint256,address)"(
      price: BigNumberish,
      price2: BigNumberish,
      dest: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getTokenDeal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTokenDeal()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTokenPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBuyBackPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getBuyBackPrice()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContractDest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getContractDest()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getBalance()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyToken(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "buyToken()"(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    buyBackToken(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "buyBackToken()"(
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    changeHolder(
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "changeHolder(address)"(
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    approveNewOwner(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approveNewOwner(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferTo(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferTo(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferToNewEscrow(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferToNewEscrow(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    approveNewTransferTargets(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approveNewTransferTargets(address,address)"(
      newBeneficiary: string,
      newHolder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}