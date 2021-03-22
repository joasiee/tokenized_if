import { IMessagingClientConfig } from "./config";
import { connect, NatsConnection, Subscription } from "nats";
import { IMessagingService } from "@baseline-protocol/messaging";

/**
 * Implementations of {@link IMessagingService} using NATS
 */
export class MessagingClient implements IMessagingService {

    private readonly url = process.env.NATS_URL;
    private nc: NatsConnection;
    private subscriptions = new Map<string, Subscription>();

    constructor(config? : IMessagingClientConfig) {
        if (config) {
            this.url = config.serverUrl
        }
    }

    /**
     * Connects client with NATS server
     * @returns Boolean value indicating whether client is succesfully connected
     */
    async connect(): Promise<boolean> {
        if (this.nc) {
            console.log(`NATS client already connected`);
            return Promise.resolve(true);
        }
        
        try {
            this.nc = await connect({servers: this.url});
            console.log(`NATS client succesfully connected with ${this.url}`);
            return true;
        } catch (err) {
            console.log(`Could not connect to NATS server: ${err.message}`);
            return false;
        }
    }

    /**
     * Discconnects client from NATS server
     */
    async disconnect(): Promise<void> {
        if (!this.nc) {
            console.log(`No NatsConnection to disconnect`);
        }
        try {
            await this.nc.close();
        } catch (err) {
            console.log(`An Error while closing the NATS connection: ${err.message}`);
        }
    }
    
    /**
     * Returns if client is connected
     * @returns The connections status 
     */
    isConnected(): boolean {
        return !(this.nc?.isClosed() ?? true);
    }

    /**
     * Returns an array of all the subjects this client is subscribed to
     * @returns Array of subject names
     */
    getSubscribedSubjects(): string[] {
        return Array.from(this.subscriptions.keys())
    }

    /**
     * Publish a payload on given subject
     * @param subject The subject (channel) to publish on
     * @param payload The data to be sent
     * @param reply Optional 
     * @param recipientId Optional recipient identifier
     * @param senderId  Option sender identifier
     */
    publish(subject: string, payload: any, reply?: string, recipientId?: string, senderId?: string): Promise<void> {
        this.nc!.publish(subject, payload);
        return Promise.resolve();
    }

    /**
     * Request data once from subject and return reply
     * @param subject The subject to request data from
     * @param timeout Time to wait
     * @param data Optional data accompanying the request
     */
    async request(subject: string, timeout: number, data?: any): Promise<any> {
        let reply =  await this.nc!.request(subject, data, {timeout: timeout});
        return reply.data;
    }

    /**
     * Subscribe to messages on a subject and assign a handler/callback for these messages
     * @param subject The subject to subscribe to
     * @param callback The callback handling incoming messages on thsi subject
     * @param myId Optional identifier
     */
    subscribe(subject: string, callback?: (msg: any, err?: any) => void, myId?: string): Promise<any> {
        let sub = this.nc!.subscribe(subject, {callback: (e, m) => callback(m, e)});
        this.subscriptions.set(subject, sub);
        return Promise.resolve();
    }

    /**
     * Unsubscribe from messages of the given subject
     * @param subject The subject to unsubscribe from
     */
    unsubscribe(subject: string) {
        let sub = this.subscriptions.get(subject);
        sub!.unsubscribe();
        this.subscriptions.delete(subject);
    }

    /**
     * Push all buffered messages to the server
     */
    async flush(): Promise<void> {
        await this.nc.flush()
    }

}