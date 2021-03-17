import { ITxManager } from '.';
export declare class InfuraGas implements ITxManager {
    private readonly config;
    constructor(config: any);
    signTx(toAddress: string, fromAddress: string, txData: string): Promise<{
        signature: string;
        gasLimit: number;
    }>;
    insertLeaf(toAddress: string, fromAddress: string, proof: any[], publicInputs: any[], newCommitment: string): Promise<{
        error: null;
        txHash: string;
    }>;
}
//# sourceMappingURL=infura-gas.d.ts.map