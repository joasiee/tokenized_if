import { createMessagingClient } from "messaging";

import dotenv from "dotenv";
import { CreateOfferDao, Offer } from "../models/offer";
import base from './messaging_base';
import { CreateShipmentDao } from "../models/shipment";
import { createOffer } from "../db/offer_queries";
import { addShipment } from "../db/shipment_queries";

// Load .env variables in process.env
dotenv.config();
// FINANCER SUBSCRIPTIONS
interface Subscription {
  setup: (firstRun: boolean) => Promise<void>;
}

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
    console.log("(Financer)Connected to NATS Server");

    /**
     * Subscription to offer subject. 
     * It will add shipments and offers to the database.
     */
    const offerSub = client.subscribe<Offer>('offer');
    (async () => {
      for await (const m of offerSub) {
        console.log(`(Financer) new offer received:\nShipment hash: ${m.payload?.shipment.cargo_hash}\nPrice: ${m.payload?.price}\nBuyback: ${m.payload?.buyback}`);
        const shipmentDao : CreateShipmentDao = {
          owner: m.payload.shipment.owner,
          cargo: JSON.stringify(m.payload.shipment.cargo),
          cargo_hash: m.payload.shipment.cargo_hash,
          escrow_address: m.payload.shipment.escrow_address,
        }
        const shipment = await addShipment(shipmentDao);
        const createOfferDao : CreateOfferDao = {
          shipment_id: shipment.id,
          price: m.payload.price,
          buyback: m.payload.buyback,
        };
        await createOffer(createOfferDao);
      };
    })();

    // Add new subscriptions here:
  }
}

export default subscriptions;
