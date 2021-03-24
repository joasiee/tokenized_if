/**
 * Object describing client configuration
 */
export interface IMessagingClientConfig {
    /** Server URL to connect to */
    serverUrl: string;
    /** Optional NKey seed (private key) */
    seed? : string;
}
