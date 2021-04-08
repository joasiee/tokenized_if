import { createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { AcceptOffer } from "../models/offer";
import base from './messaging_base';

// Load .env variables in process.env
dotenv.config();
// FINANCER SUBSCRIPTIONS
interface Subscription {
  setup: (firstRun: boolean) => Promise<void>;
}

const subscriptions: Subscription = {
  async setup(firstRun: boolean): Promise<void> {

    const client = createMessagingClient({
      serverUrl: `${process.env.NATS_URL}:${process.env.NATS_PORT}`,
      user: process.env.NATS_NAME,
      //seed: process.env.NATS_PRIVATE_KEY,
    });

    // Setup connection with LSP
    await base.setup(firstRun);

    // await client.connect();
    // console.log("(Financer)Connected to NATS Server");

    // const acceptSub = client.subscribe<AcceptOffer>('accept');
    // (async () => {
    //   for await (const m of acceptSub) {

    //     console.log(m.payload.cargoHash);
    //   };
    // })();

    // Add new subscriptions here:
  }
}

export default subscriptions;
