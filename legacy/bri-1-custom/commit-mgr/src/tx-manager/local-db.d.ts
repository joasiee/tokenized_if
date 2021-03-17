import { ITxManager } from '.';
export declare class LocalDb implements ITxManager {
    private readonly config;
    constructor(config: any);
    insertLeaf(merkleId: string, fromAddress: string, proof: any[], publicInputs: any[], newCommitment: string): Promise<{
        error: null;
        txHash: any;
    }>;
}
//# sourceMappingURL=local-db.d.ts.map