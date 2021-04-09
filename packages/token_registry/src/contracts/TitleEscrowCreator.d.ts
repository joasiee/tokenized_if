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
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface TitleEscrowCreatorInterface extends ethers.utils.Interface {
  functions: {
    "deployNewTitleEscrow(address,address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deployNewTitleEscrow",
    values: [string, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployNewTitleEscrow",
    data: BytesLike
  ): Result;

  events: {
    "TitleEscrowDeployed(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TitleEscrowDeployed"): EventFragment;
}

export class TitleEscrowCreator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TitleEscrowCreatorInterface;

  functions: {
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  deployNewTitleEscrow(
    tokenRegistry: string,
    beneficiary: string,
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "deployNewTitleEscrow(address,address,address)"(
    tokenRegistry: string,
    beneficiary: string,
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    TitleEscrowDeployed(
      escrowAddress: string | null,
      tokenRegistry: string | null,
      beneficiary: null,
      holder: null
    ): EventFilter;
  };

  estimateGas: {
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
