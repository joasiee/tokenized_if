import { ITxManager } from '.';
export declare class EthClient implements ITxManager {
    private readonly config;
    constructor(config: any);
    signTx(toAddress: string, fromAddress: string, txData: any): Promise<string>;
    insertLeaf(toAddress: string, fromAddress: string, proof: any[], publicInputs: any[], newCommitment: string): Promise<{
        error: null;
        txHash: string;
    }>;
}
//# sourceMappingURL=eth-client.d.ts.map