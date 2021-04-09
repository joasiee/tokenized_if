import { createMessagingClient } from "@tokenized_if/messaging";

import dotenv from "dotenv";
import { setTokenRegistry } from "../../db/registry_queries";
import { Participant } from "../../models/participant";

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

    // If first run, it will request the token registry address from the LSP and set it in the database.
    if (firstRun) {
      const registryAddress = await lspClient.request<undefined, string>('token_registry');
      await setTokenRegistry(registryAddress);
      console.log("Token registry set in DB by request from LSP");
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