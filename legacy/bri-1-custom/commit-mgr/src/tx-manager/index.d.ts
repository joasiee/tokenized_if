export interface ITxManager {
    insertLeaf(toAddress: string, fromAddress: string, proof: any[], publicInputs: any[], newCommitment: string): Promise<any>;
}
export declare function txManagerServiceFactory(provider: string, config?: any): Promise<ITxManager>;
//# sourceMappingURL=index.d.ts.map