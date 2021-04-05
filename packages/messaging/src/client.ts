import {
  IMessagingClient,
  IMessagingClientConfig,
  ReceivedMessage,
  RequestResponseObject,
} from "./interfaces";
import {
  connect,
  headers,
  JSONCodec,
  MsgHdrs,
  NatsConnection,
  nkeyAuthenticator,
  Subscription,
} from "nats";

/**
 * Returns a new {@link MessagingClient}
 * @param config Optional configuration object
 */
export function createMessagingClient(
  config?: IMessagingClientConfig
): IMessagingClient {
  return new MessagingClient(config);
}

/**
 * Implementations of {@link IMessagingClient} using NATS
 */
export class MessagingClient implements IMessagingClient {
  private readonly url = process.env.NATS_URL;
  private readonly seed?: Uint8Array;
  private readonly username: string;
  private readonly headers? : MsgHdrs;

  private nc: NatsConnection;
  private subscriptions = new Map<string, Subscription>();


  constructor(config?: IMessagingClientConfig) {
    if (config) {
      this.url = config.serverUrl;
      if (config.seed) {
        this.seed = new TextEncoder().encode(config.seed);
      }
      if(config.user) {
        this.username = config.user;
        this.headers = headers();
        this.headers.append("user", this.username);
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
        ...(this.seed && { authenticator: nkeyAuthenticator(this.seed) }),
      });
      console.log(`NATS client succesfully connected with ${this.url}`);
      return true;
    } catch {
      console.log("Could not connect to NATS server");
      return false;
    }
  }

  async disconnect(): Promise<boolean> {
    if (!this.nc) {
      console.log(`No NatsConnection to disconnect from`);
      return true;
    }
    const done = this.nc.closed();
    await this.nc.close();
    const err = await done;
    if (err) {
      console.log(`An Error while closing the NATS connection: ${err.message}`);
      return false;
    }
    return true;
  }

  isConnected(): boolean {
    return !(this.nc?.isClosed() ?? true);
  }

  async *subscribe<T>(subject: string): AsyncGenerator<ReceivedMessage<T>> {
    if (this.subscriptions.has(subject)) {
      this.subscriptions.get(subject).unsubscribe();
    }
    const sub = this.nc?.subscribe(subject);
    this.subscriptions.set(subject, sub);
    const jc = JSONCodec<T>();
    for await (const m of sub) {
      if (m.headers) {
        for (const [key, value] of m.headers) {
          console.log(`${key}=${value}`);
        }
      }
      yield {
        subject: m.subject,
        ...(m.headers?.has("user") && { user: m.headers.get("user")}),
        ...(m.data.length && { payload: jc.decode(m.data) }),
      };
    }
    console.log(`subscription closed: ${subject}`);
  }

  async publish<T>(subject: string, payload?: T): Promise<void> {
    const jc = JSONCodec<T>();
    this.nc?.publish(
      subject,
      payload !== undefined ? jc.encode(payload) : undefined,
      { headers: this.headers }
    );
    await this.nc.flush();
  }

  async request<I, O>(
    subject: string,
    payload?: I,
    timeout = 2000
  ): Promise<O> {
    const jci = JSONCodec<I>();
    const jco = JSONCodec<O>();
    let result: O;
    try {
      const reply = await this.nc?.request(
        subject,
        payload !== undefined ? jci.encode(payload) : undefined,
        { timeout: timeout, headers: this.headers }
      );
      return jco.decode(reply.data);
    } catch (err) {
      console.log(
        `An error occurred requesting subject: ${subject}, with payload: ${payload} \n\t ${err}`
      );
    }
    return result;
  }

  async *reply<I, O>(
    subject: string
  ): AsyncGenerator<RequestResponseObject<I, O>> {
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
        ...(m.headers?.has("user") && { user: m.headers.get("user")}),
        ...(m.data.length && { payload: jci.decode(m.data) }),
        // Return a closure instead of function directly
        // to enforce respond being called once
        respond: (() => {
          let executed = false;
          return (response: O) => {
            if (!executed) {
              executed = true;
              m.respond(jco.encode(response), { headers: this.headers });
            }
            return Promise.resolve();
          };
        })(),
      };
    }
  }

  async unsubscribe(subject: string): Promise<void> {
    const sub = this.subscriptions.get(subject);
    sub?.unsubscribe();
    this.subscriptions.delete(subject);
    return Promise.resolve();
  }

  getSubscribedSubjects(): string[] {
    return Array.from(this.subscriptions.keys());
  }
}
