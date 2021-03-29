/**
 * Object describing client configuration
 */
export interface IMessagingClientConfig {
    /** Server URL to connect to */
    serverUrl: string;
    /** Optional NKey seed (private key) */
    seed?: string;
}

/**
 * A message with optional payload received on a subject
 */
export interface ReceivedMessage<T> {
    subject: string;
    payload?: T;
}

/**
 * Allows responding to a received message by calling response
 */
export interface RequestResponseObject<Req, Res> extends ReceivedMessage<Req> {
    /**
     * Responds with the given response (To be called once)
     * @param response the response to the request
     */
    respond(response: Res): Promise<void>
}

export interface IMessagingClient {
    /**
     * Connects client and indicates whether client is succesfully connected.
     */
    connect(): Promise<boolean>;

    /**
     * Closes connection and indicates whether client is succesfully disconnected.
     */
    disconnect(): Promise<boolean>;
    /**
     * Returns if client is connected
     * @returns The connections status
     */
    isConnected(): boolean;

    /**
     * Subscribes client on messages of a given subject, subject names are unique
     * in the sense that subscribing on the same topic a second time invalidates the
     * first subscription.
     * Returns an {@link AsyncIterable}
     * @param subject the name of the subject to subscribe to
     */
    subscribe<T>(subject: string): AsyncGenerator<ReceivedMessage<T>>;

    /**
     * Publishes on the given subject, additional information can be provided by the
     * optional payload argument.
     * @param subject subject to publish on
     * @param payload optional payload
     */
    publish<T>(subject: string, payload?: T): Promise<void>;

    /**
     * Requests a reply for a given subject, payload argument can be provided.
     * Returns the obtained reply
     * @param subject subject to request on
     * @param payload optional payload
     * @param timeout timeout im ms to wait for a reply
     */
    request<I, O>(subject: string, payload?: I, timeout?: number): Promise<O>;

    /**
     * Setup a way to reply to a request on a given subject
     * @param subject subject to listen on for requests
     */
    reply<I, O>(subject: string): AsyncIterable<RequestResponseObject<I, O>>

    /**
     * Unsubscribes the client from the given subject.
     * @param subject the name of the subject to unsubscribe from
     */
    unsubscribe(subject: string): Promise<void>;

    /**
     * Returns an array of all the subjects this client is subscribed to
     * @returns Array of subject names
     */
    getSubscribedSubjects(): string[];
}
