import { IMessagingClient, createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { AcceptOffer, EscrowAddress, Offer } from "../models/offer";
import { Shipment } from "../models/shipment";
import { Cargo } from "../models/cargo";
import { Participant } from "../models/participant";
import { addParticipant, getAllParticipants } from "../db/participant_queries";

// Load .env variables in process.env
dotenv.config();

// LSP SUBSCRIPTIONS
interface Subscription {
  setup: () => Promise<void>;
}

const subscriptions: Subscription = {
  async setup(): Promise<void> {
    const client = createMessagingClient({
      serverUrl: `${process.env.NATS_URL}:${process.env.NATS_PORT}`,
      user: process.env.NATS_NAME,
      seed: process.env.NATS_PRIVATE_KEY,
    });

    await client.connect();
    console.log("Connected to NATS Server");

    // Subscribe for clients wanting to join
    const admitSub = client.reply<Participant, Participant[]>('admittance');
    (async () => {
      for await (const m of admitSub) {
        // Respond with all currently known participants
        const participants = await getAllParticipants(); 
        await m.respond(participants);

        // Add the new participant and notify subscribers
        await addParticipant(m.payload);
        await client.publish<Participant>('participants', m.payload);
      }
    })();

    // Subscribe for clients wanting to deploy their escrow
    const acceptSub = client.reply<AcceptOffer, EscrowAddress>('escrow');
    (async () => {
      for await (const m of acceptSub) {
        m.payload.cargoHash;
        // const address = Maak escrow aan
        const escrow: EscrowAddress = { address: "" };
        await m.respond(escrow);
      };
    })();

    // Add new subscriptions here:
  }
}

export default subscriptions;
