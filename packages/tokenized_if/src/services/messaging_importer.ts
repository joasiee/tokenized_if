import { IMessagingClient, createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { AcceptOffer } from "../models/offer";
import { Cargo } from "../models/cargo";
import base from './messaging_base';

// Load .env variables in process.env
dotenv.config();
// IMPORTER SUBSCRIPTIONS
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

    // // Setup own subscriptions
    // await client.connect();
    // console.log("(Importer)Connected to NATS Server");

    // const offerSub = client.subscribe<Cargo>('offer');
    // (async () => {
    //   for await (const m of offerSub) {
    //     console.log(m.payload.uuid);
    //   };
    // })();
    // console.log("Setup subscription for offers");

    // const acceptSub = client.subscribe<AcceptOffer>('accept');
    // (async () => {
    //   for await (const m of acceptSub) {
    //     // aanvragen escrow
    //     // create client connected with LSP
    //     // const escrow = await client.request<I,O>('escrow', hash);  
    //     // new client.publish()
    //   };
    // })();


    // Add new subscriptions here:
  }
}

export default subscriptions;
