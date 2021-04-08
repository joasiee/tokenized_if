import dotenv from 'dotenv';
import { createMessagingClient } from "messaging";
import importer from './messaging_importer';
import financer from './messaging_financer';
import lsp from './messaging_lsp';
import { addParticipant, getParticipant } from '../db/participant_queries';
import { getTokenRegistry } from '../db/registry_queries';
import { tm, tokenSetup } from './token';

dotenv.config();

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

  await tokenSetup(await getTokenRegistry());

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
};