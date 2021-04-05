import { IMessagingClient, createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { AcceptOffer, Offer } from "../models/offer";
import { Shipment } from "../models/shipment";
import { Cargo } from "../models/cargo";

// Load .env variables in process.env
dotenv.config();
// FINANCER SUBSCRIPTIONS
interface Subscription {
  setup: () => Promise<void>;
}

const subscriptions: Subscription = {
  async setup(): Promise<void> {
    const subscriber = createMessagingClient({
      serverUrl: `${process.env.NATS_URL}:${process.env.NATS_PORT}`,
      user: process.env.NATS_NAME,
      seed: process.env.NATS_PRIVATE_KEY,
    });

    await subscriber.connect();
    console.log("Connected to NATS Server");
    
    const acceptSub = subscriber.subscribe<AcceptOffer>('accept');
    (async () => {
      for await (const m of acceptSub) {

        console.log(m.payload.cargoHash);
      };
    })();

    
    // Add new subscriptions here:
  }
}

export default subscriptions;
