import { createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { Participant } from "../models/participant";
import { addParticipant } from "../db/participant_queries";

// Load .env variables in process.env
dotenv.config();

// BASE LSP SUBSCRIPTIONS
interface Subscription {
  setup: (firstRun: boolean) => Promise<void>;
}

const subscriptions: Subscription = {
  async setup(firstRun: boolean): Promise<void> {

    // Setup connection with LSP

    const lspClient = createMessagingClient({
      serverUrl: process.env.LSP_NATS,
      user: process.env.NAME,
    });
    await lspClient.connect();
    console.log('Connected to NATS Server LSP');

    if (firstRun) {
      const participants = await lspClient.request<Participant, Participant[]>('admittance');
      for (const participant of participants) {
        await addParticipant(participant);
      }
    }

    const participantsSub = lspClient.subscribe<Participant>('participants');
    (async () => {
      for await (const m of participantsSub) {
        await addParticipant(m.payload);
      };
    })();

    // Add new subscriptions here:
  }
}

export default subscriptions;