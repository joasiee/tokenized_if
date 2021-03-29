import { MessagingClient } from "./client";
import { IMessagingClient, IMessagingClientConfig } from "./interfaces";

/**
 * Returns a new {@link MessagingClient}
 * @param config Optional configuration object
 */
export function createMessagingClient(config?: IMessagingClientConfig): IMessagingClient {
    return new MessagingClient (config);
}
