import { createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { Participant } from "../models/participant";
import { addParticipant } from "../db/participant_queries";
import { setRegistry } from "../db/registry_queries";

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
      const registryAddress = await lspClient.request<undefined, string>('token_registry');
      await setRegistry(registryAddress);
      console.log("Token registry set in DB");

      // // REPLACE BY BASELINE
      // const participants = await lspClient.request<Participant, Participant[]>('admittance');
      // for (const participant of participants) {
      //   await addParticipant(participant);
    }

    // // REPLACE BY BASELINE
    // const participantsSub = lspClient.subscribe<Participant>('participants');
    // (async () => {
    //   for await (const m of participantsSub) {
    //     await addParticipant(m.payload);
    //   };
    // })();

    // Add new subscriptions here:
  }
}

export default subscriptions;