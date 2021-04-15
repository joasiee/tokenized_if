import dotenv from "dotenv";
import importer from "./messaging/messaging_importer";
import financer from "./messaging/messaging_financer";
import lsp from "./messaging/messaging_lsp";
import { addParticipant, getParticipant } from "../db/participant_queries";
import { getTokenRegistry } from "../db/registry_queries";
import { tm, tokenSetup } from "./token";
import { Participant } from "../models/participant";
import { createMessagingClient } from "@tokenized_if/messaging";
import baselineSetup from "./baseline";

// Load in the .env file
dotenv.config();

/**
 * A setup function which will switch cases depending on the role importer, financer or LSP.
 * If it is the first run, then additional steps are needed.
 */
export async function setup() {
  const role = process.env.ROLE;
  const user = await getParticipant(process.env.NAME);
  const firstRun = !user;

  switch (role) {
    case "importer":
      await importer.setup(firstRun);
      break;
    case "financer":
      await financer.setup(firstRun);
      break;
    case "lsp":
    default:
      await lsp.setup();
  }

  // Retrieves token registry from the database, the tokenSetup function will branch, depending on if this token registry exists.
  await tokenSetup(await getTokenRegistry());

  // Perform baseline setup as LSP
  if (role === "lsp") {
    await baselineSetup();
  }

  // Adds data into the database if it is the first run.
  if (firstRun) {
    const pubAddress = tm.signer.address;
    const natsEndpoint = `${process.env.NATS_URL}:${process.env.NATS_PORT}`;
    const participant: Participant = {
      name: process.env.NAME,
      address: pubAddress,
      nats: natsEndpoint,
      nats_key: "0x1234", // Replace by environment
      zkp_key: "0x9876", // Replace by environment
      role: role
    };

    await addParticipant(participant);

    // Request admittance from LSP to the Org Registry
    if (role !== "lsp") {
      const lspClient = createMessagingClient({
        serverUrl: process.env.LSP_NATS,
        user: process.env.NAME
      });
      console.log("Requested LSP for admittance to Org Registry");
      await lspClient.connect();
      await lspClient.publish<Participant>("admittance", participant);
    }
  }
}
