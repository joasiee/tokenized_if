import { IMessagingClient, createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { AcceptOffer, EscrowAddress, Offer } from "../models/offer";
import { Shipment } from "../models/shipment";
import { Cargo } from "../models/cargo";

// Load .env variables in process.env
dotenv.config();
// LSP SUBSCRIPTIONS
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
    
    const acceptSub = subscriber.reply<AcceptOffer, EscrowAddress>('escrow');
    (async () => {
      for await (const m of acceptSub) {
        m.payload.cargoHash;
        // const address = Maak escrow aan
        const escrow : EscrowAddress = { address: "" }; 
        await m.respond(escrow);
      };
    })();

    
    // Add new subscriptions here:
  }
}

export default subscriptions;
