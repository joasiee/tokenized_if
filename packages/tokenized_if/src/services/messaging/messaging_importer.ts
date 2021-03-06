import { IMessagingClient, createMessagingClient } from "@tokenized_if/messaging";

import dotenv from "dotenv";
import base from './messaging_base';
import { CreateShipmentDao, Shipment } from "../../models/shipment";
import { addShipment, getShipmentByHash } from "../../db/shipment_queries";
import { tm } from "../token";
import { getOfferByHash, setFinancer } from "../../db/offer_queries";
import { AcceptOffer } from "../../models/offer";
import { getFinancer } from "../baseline/helpers/organization_queries";

// Load .env variables in process.env
dotenv.config();
// IMPORTER SUBSCRIPTIONS
interface Subscription {
  setup: (firstRun: boolean) => Promise<void>;
}

/**
 * Code for handling messages for importer.
 */
const subscriptions: Subscription = {
  async setup(firstRun: boolean): Promise<void> {
    const client = createMessagingClient({
      serverUrl: `${process.env.NATS_URL}:${process.env.NATS_PORT}`,
      user: process.env.NATS_NAME,
      //seed: process.env.NATS_PRIVATE_KEY,
    });

    // Setup connection with LSP
    await base.setup(firstRun);

    await client.connect();
    
    /**
     * Setup subscription for new shipments. 
     * It will add the shipments to the database.
     */
    const shipmentSub = client.subscribe<Shipment>('shipment');
    (async () => {
      for await(const m of shipmentSub) {
        console.log(`(Importer) Subscription (shipment) received: \nShipment hash: ${m.payload?.cargo_hash}\nEscrow address: ${m.payload.escrow_address}`);
        // Creating a shipment to be added to the database.
        const shipment: CreateShipmentDao = {
          owner: m.payload.owner,
          cargo: JSON.stringify(m.payload.cargo),
          cargo_hash: m.payload.cargo_hash,
          escrow_address: m.payload.escrow_address,
        };
        await addShipment(shipment);
      }
    })();

    // // Setup own subscriptions
    // await client.connect();
    // console.log("(Importer)Connected to NATS Server");

    // const offerSub = client.subscribe<Cargo>('offer');
    // (async () => {
    //   for await (const m of offerSub) {
    //     console.log(m.payload.uuid);
    //   };
    // })();
    // console.log("Setup subscription for offers");

    /**
     * Handling accept offers.
     */
    const acceptRep = client.reply<AcceptOffer, boolean>('accept');
    (async () => {
      for await (const m of acceptRep) {
        console.log(`(Importer) Subscription (accept) received: \nShipment hash: ${m.payload?.cargo_hash}\nFinancer: ${m.payload.financer}`);
        const offer = await getOfferByHash(m.payload.cargo_hash);
        console.log(`Escrow address: ${offer.shipment.escrow_address}`);
        // Check if offer is already accepted, by checking if we have a financer.
        if (offer.financer) {
          m.respond(false);
        } else {
          // if not, assign deal to financer
          const financer = await getFinancer(m.payload.financer);
          const escrow = tm.connectEscrowInstance(offer.shipment.escrow_address, tm.signer);
          await escrow.setTokenDeal(tm.ethToWei(offer.price), tm.ethToWei(offer.buyback), financer.address);
          // Update financer of offer
          await setFinancer(offer.id, m.payload.financer);
          // Get deal from chain
          const deal = await tm.getTokenDeal(escrow);
          console.log("[DEAL] price: ", deal[0], ", buyBackprice: ", deal[1], ", token transferred to: ", deal[2]);
          console.log("Current Holder: ", await escrow.holder());
          m.respond(true);
        }
      };
    })();


    // Add new subscriptions here:
  }
}

export default subscriptions;
