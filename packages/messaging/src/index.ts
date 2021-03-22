import { MessagingClient } from "./client";
import { IMessagingClientConfig } from "./config";
import { IMessagingService } from "@baseline-protocol/messaging";

/**
 * Returns a new {@link MessagingClient}
 * @param config Optional configuration object
 */
export function createMessagingClient(config?: IMessagingClientConfig) : IMessagingService {
    return new MessagingClient(config);
}