import { IMessagingClient, IMessagingClientConfig, ReceivedMessage, RequestResponseObject } from "./interfaces";
import { connect, JSONCodec, NatsConnection, nkeyAuthenticator, Subscription } from "nats";

/**
 * Implementations of {@link IMessagingClient} using NATS
 */
export class MessagingClient implements IMessagingClient {

    private readonly url = process.env.NATS_URL;
    private readonly seed? : Uint8Array;

    private nc: NatsConnection;
    private subscriptions = new Map<string, Subscription>();

    constructor(config? : IMessagingClientConfig) {
        if (config) {
            this.url = config.serverUrl;
            if (config.seed) {
                this.seed = new TextEncoder().encode(config.seed);
            } 
        }
    }

    /**
     * Connects client with NATS server
     * @returns Boolean value indicating whether client is succesfully connected
     */
    async connect(): Promise<boolean> {
        try {
            this.nc = await connect({
                servers: this.url,
                ...(this.seed) && {authenticator: nkeyAuthenticator(this.seed)}
            });
            console.log(`NATS client succesfully connected with ${this.url}`);
            return true;
        } catch (err) {
            console.log(`Could not connect to NATS server: ${err.message}`);
            return false;
        }
    }

    async disconnect(): Promise<boolean> {
        if (!this.nc) {
            console.log(`No NatsConnection to disconnect from`);
            return true;
        }
        try {
            await this.nc.drain();
            await this.nc.close();
            return true;
        } catch (err) {
            console.log(`An Error while closing the NATS connection: ${err.message}`);
            return false;
        }
    }

    isConnected(): boolean {
        return !(this.nc?.isClosed() ?? true);
    }

    async *subscribe<T>(subject: string): AsyncIterable<ReceivedMessage<T>> {
        if (this.subscriptions.has(subject)) {
            this.subscriptions.get(subject).unsubscribe();
        }
        const sub = this.nc?.subscribe(subject);
        this.subscriptions.set(subject, sub);
        const jc = JSONCodec<T>();
        for await (const m of sub) {
            yield { subject: m.subject, payload: jc.decode(m.data) };
        }
    }

    publish<T>(subject: string, payload?: T): Promise<void> {
        const jc = JSONCodec<T>();
        this.nc?.publish(subject, payload ? jc.encode(payload) : undefined);
        return Promise.resolve();
    }

    async request<I, O>(subject: string, payload?: I, timeout = 2000): Promise<O> {
        const jci = JSONCodec<I>();
        const jco = JSONCodec<O>();
        let result: O;
        try {
            const reply = await this.nc?.request(
                subject,
                payload ? jci.encode(payload) : undefined,
                { timeout: timeout });
            result = jco.decode(reply.data);
        } catch (err) {
            console.log(`An error occurred requesting subject: ${subject} with payload: ${payload} \n\t ${err}`);
        } finally {
            return result;
        }
    }

    async *reply<I, O>(subject: string): AsyncIterable<RequestResponseObject<I, O>> {
        if (this.subscriptions.has(subject)) {
            this.subscriptions.get(subject).unsubscribe();
        }
        const sub = this.nc?.subscribe(subject);
        this.subscriptions.set(subject, sub);
        const jci = JSONCodec<I>();
        const jco = JSONCodec<O>();
        for await (const m of sub) {
            yield {
                subject: m.subject,
                payload: jci.decode(m.data),
                // Return a closure instead of function directly
                // to enforce respond being called once
                respond: (() => {
                    let executed = false;
                    return async (response: O) => {
                        if (!executed) {
                            executed = true;
                            m.respond(jco.encode(response));
                        }
                    };
                })()
            };
        }
    }   

    unsubscribe(subject: string): Promise<void> {
        const sub = this.subscriptions.get(subject);
        sub?.unsubscribe();
        this.subscriptions.delete(subject);
        return Promise.resolve();
    }
    
    getSubscribedSubjects(): string[] {
        return Array.from(this.subscriptions.keys())
    }
}
