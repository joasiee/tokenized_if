import dotenv from 'dotenv';
import importer from './messaging_importer';
import financer from './messaging_financer';
import lsp from './messaging_lsp';
import { addParticipant, getParticipant } from '../db/participant_queries';
import { getTokenRegistry } from '../db/registry_queries';
import { tm, tokenSetup } from './token';

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
    case 'importer':
      await importer.setup(firstRun);
      break;
    case 'financer':
      await financer.setup(firstRun);
      break;
    case 'lsp':
    default:
      await lsp.setup();
  }

  // Retrieves token registry from the database, the tokenSetup function will branch, depending on if this token registry exists.
  await tokenSetup(await getTokenRegistry());

  // Adds data into the database if it is the first run.
  if (firstRun) {
    const pubAddress = tm.signer.address;
    const natsEndpoint = `${process.env.NATS_URL}:${process.env.NATS_PORT}`;
    await addParticipant({
      name: process.env.NAME,
      address: pubAddress,
      nats: natsEndpoint,
      role: process.env.ROLE,
    });
  }
}