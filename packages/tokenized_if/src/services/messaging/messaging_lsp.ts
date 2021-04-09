import { IMessagingClient, createMessagingClient } from "@tokenized_if/messaging";

import dotenv from "dotenv";
import { getTokenRegistry } from "../../db/registry_queries";
import { tm } from "../token";
import { getShipmentByHash } from "../../db/shipment_queries";
import { OrgRegistryReply } from "../../models/registry";
import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";
import { addOrganization, getOrgRegistry } from "../baseline/organizations";
import { Participant } from "../../models/participant";

// Load .env variables in process.env
dotenv.config();

// LSP SUBSCRIPTIONS
interface Subscription {
  setup: () => Promise<void>;
}

/**
 * Code for handling messaging of the LSP.
 */
const subscriptions: Subscription = {
  async setup(): Promise<void> {
    const client = createMessagingClient({
      serverUrl: `${process.env.NATS_URL}:${process.env.NATS_PORT}`,
      user: process.env.NATS_NAME,
      seed: process.env.NATS_PRIVATE_KEY,
    });

    await client.connect();
    console.log("(LSP)Connected to NATS Server");

    // Sends the address of the token registry to clients.
    const registryRep = client.reply<undefined, string>('token_registry');
    (async () => {
      for await (const m of registryRep) {
        await m.respond(await getTokenRegistry());
      }
    })();

    // Does a check whether the token registry is the owner of the token related to a shipment, and if true proceeds to burn the token.
    const releaseSub = client.subscribe<string>('release');
    (async () => {
      for await (const m of releaseSub) {
        const shipment = await getShipmentByHash(m.payload);
        if (shipment && tm.tokenRegistry.address === await tm.ownerOfToken(shipment.cargo_hash)) {
          await tm.burnToken(shipment.cargo_hash);
          console.log(`(LSP) Burned token: ${shipment.cargo_hash}`);
        }
      }
    })();

    // Setup reply object for org registry requests
    const orgRegistryRep = client.reply<string, OrgRegistryReply>('org_registry');
    (async () => {
      for await (const m of orgRegistryRep) {
        let registry : OrgRegistry;
        switch (m.payload) {
          case 'financer':
            registry = await getOrgRegistry('financer-registry');
            await m.respond({ name: registry.getName(), address: registry.getAddress() })
            break;
          case 'importer':
            registry = await getOrgRegistry('importer-registry');
            await m.respond({ name: registry.getName(), address: registry.getAddress() })
            break;
          default:
            break;
        }
      }
    })();

    // Subscribe for clients wanting to join
    const admitSub = client.subscribe<Participant>('admittance');
    (async () => {
      for await (const m of admitSub) {
        // Add participant to org registry
        await addOrganization(m.payload);
      }
    })();

    // // Subscribe for clients wanting to deploy their escrow
    // const acceptSub = client.reply<AcceptOffer, EscrowAddress>('escrow');
    // (async () => {
    //   for await (const m of acceptSub) {
    //     m.payload.cargoHash;
    //     // const address = Maak escrow aan
    //     const escrow: EscrowAddress = { address: "" };
    //     await m.respond(escrow);
    //   };
    // })();

    // Add new subscriptions here:
  }
}

export default subscriptions;
