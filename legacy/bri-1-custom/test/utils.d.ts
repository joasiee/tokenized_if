import { ParticipantStack } from '../src/index';
export declare const promisedTimeout: (ms: any) => Promise<unknown>;
export declare const authenticateUser: (identHost: any, email: any, password: any) => Promise<any>;
export declare const baselineAppFactory: (orgName: any, bearerToken: any, initiator: any, identHost: any, natsHost: any, natsPrivateKey: any, natsPublicKey: any, nchainHost: any, networkId: any, vaultHost: any, privacyHost: any, rcpEndpoint: any, rpcScheme: any, workgroup: any, workgroupName: any, workgroupToken: any, vaultSealUnsealKey: any) => Promise<ParticipantStack>;
export declare const configureTestnet: (dbport: any, networkId: any) => Promise<boolean>;
export declare const createUser: (identHost: any, firstName: any, lastName: any, email: any, password: any) => Promise<any>;
export declare const scrapeInvitationToken: (container: any) => Promise<any>;
export declare const vendNatsAuthorization: (natsConfig: any, subject: any) => Promise<string>;
//# sourceMappingURL=utils.d.ts.map