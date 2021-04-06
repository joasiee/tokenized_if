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

interface ITitleEscrowCreatorInterface extends ethers.utils.Interface {
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

  events: {};
}

export class ITitleEscrowCreator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ITitleEscrowCreatorInterface;

  functions: {
    /**
     * Deploys an instance of a title escrow
     */
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    /**
     * Deploys an instance of a title escrow
     */
    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  /**
   * Deploys an instance of a title escrow
   */
  deployNewTitleEscrow(
    tokenRegistry: string,
    beneficiary: string,
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  /**
   * Deploys an instance of a title escrow
   */
  "deployNewTitleEscrow(address,address,address)"(
    tokenRegistry: string,
    beneficiary: string,
    holder: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    /**
     * Deploys an instance of a title escrow
     */
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Deploys an instance of a title escrow
     */
    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    /**
     * Deploys an instance of a title escrow
     */
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    /**
     * Deploys an instance of a title escrow
     */
    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Deploys an instance of a title escrow
     */
    deployNewTitleEscrow(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    /**
     * Deploys an instance of a title escrow
     */
    "deployNewTitleEscrow(address,address,address)"(
      tokenRegistry: string,
      beneficiary: string,
      holder: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
