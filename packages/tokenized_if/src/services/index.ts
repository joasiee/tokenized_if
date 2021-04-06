import dotenv from 'dotenv';
import { createMessagingClient } from "messaging";
import importer from './messaging_importer';
import financer from './messaging_financer';
import lsp from './messaging_lsp';
import { addParticipant, getParticipant } from '../db/participant_queries';
import { getRegistry, setRegistry } from '../db/registry_queries';

dotenv.config();

export async function setup() {
  const role = process.env.ROLE;
  const user = await getParticipant(process.env.NAME);
  const firstRun = user === null;

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
      if (firstRun) {
        const address = "" // setup token registry
        await setRegistry(address);
      } else {
        const address = await getRegistry();
        // setup registry with this address
      }
  }
  
  if (firstRun) {
    const pubAddress = "" // signer.getAddress();
    const natsEndpoint = `${process.env.NATS_URL}:${process.env.NATS_PORT}`;
    await addParticipant({
      name: process.env.NAME,
      address: pubAddress,
      nats: natsEndpoint,
      role: process.env.ROLE,
    });
    if (role !== 'lsp') {
      //retrieve token registry form lsp
    }
  }

  // retrieve token registry location from lsp
  if (role !== 'lsp') {
    
  }

};