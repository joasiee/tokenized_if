import express from "express";
import { addShipment, getAllShipments, getShipmentById } from "../db/shipment_queries";
import { CreateShipmentObject, Shipment } from "../models/shipment";
import { errorMessage, successMessage } from "./helpers/status";
import web3 from "web3";
import { createMessagingClient } from "@tokenized_if/messaging";
import { CreateOfferDao, Offer } from "../models/offer";
import { tm } from "../services/token";
import { Participant } from "../models/participant";
import { createOffer } from "../db/offer_queries";
import { getFinancers, getImporter, getLsp } from "../services/baseline/helpers/organization_queries";

class ShipmentController {
  async getAll(req: express.Request, res: express.Response) {
    const shipments = await getAllShipments();
    res.status(200).send(shipments);
  }

  /**
   * Only to be called as LSP. 
   * We create a new shipment here, and we add this to the database. The title escrow is also deployed.
   */
  async post(req: express.Request, res: express.Response) {
    const create = req.body as CreateShipmentObject;
    console.log(req.body);
    const cargoString = JSON.stringify(create.cargo);
    // Replace by baseline hash
    const cargoHash = web3.utils.sha3(cargoString);
    const owner = await getImporter(create.owner);
    const escrowInstance = await tm.deployImporterEscrow(cargoHash, owner.address);
    const shipment = await addShipment({
      owner: create.owner,
      cargo: cargoString,
      escrow_address: escrowInstance.address,
      cargo_hash: cargoHash,
    });

    // Notify importer of shipment arrival
    await notifyImporterShipment(owner, shipment);
    successMessage.data = shipment;
    res.status(201).send(successMessage);
  }

  /**
   * Importer can create offers and send them to financer.
   */
  async offer(req: express.Request, res: express.Response) {
    const { shipmentId } = req.params;
    const shipmentIdInt = parseInt(shipmentId);
    const price = parseFloat(req.body.price);
    const buyback = parseFloat(req.body.buyback);
    const createOfferDao: CreateOfferDao = {
      shipment_id: shipmentIdInt,
      price: price,
      buyback: buyback,
    };

    // add offer to the database
    const offer = await createOffer(createOfferDao);

    // Notify financers of new offer
    notifyFinancersOffers(offer);

    successMessage.data = offer;
    res.send(successMessage);
  }

  /**
   * Importer can decide to issue a release request.
   * The release request will be made and token will be sent to the token registry.
   * The LSP will also be notified so they can burn the token.
   */
  async release(req: express.Request, res: express.Response) {
    const { shipmentId } = req.params;
    const shipmentIdInt = parseInt(shipmentId);
    const shipment = await getShipmentById(shipmentIdInt);

    const escrow = tm.connectEscrowInstance(shipment.escrow_address, tm.signer);
    const beneficiary = await escrow.beneficiary();
    const holder = await escrow.holder();
    // Check if we have right of release
    if (beneficiary === holder) {
      await tm.sendRelease(escrow);
      console.log("Token succesfully released");

      // Notify LSP of release
      notifyLspRelease(shipment.cargo_hash);

      res.send(successMessage);
    } else {
      console.log("Could not release token: You are not the holder");
      res.send(errorMessage);
    }
  }

}

// Helper functions
async function notifyImporterShipment(importer: Participant, shipment: Shipment): Promise<void> {
  const importerClient = createMessagingClient({
    serverUrl: importer.nats,
    // user: optional name of lsp
  });
  await importerClient.connect();
  await importerClient.publish<Shipment>('shipment', shipment);
  await importerClient.disconnect();
}

async function notifyFinancersOffers(offer: Offer): Promise<void> {
  const financers = await getFinancers();

  for (const financer of financers) {
    try {
      const financerClient = createMessagingClient({
        serverUrl: financer.nats,
      });
      await financerClient.connect();
      await financerClient.publish<Offer>('offer', offer);
      console.log(`(Importer) Offer published to financer: ${financer.name}`);
      await financerClient.disconnect();
    } catch (err) {
      console.log(err);
    }
    const financerClient = createMessagingClient({
      serverUrl: financer.nats,
    });
  }
}

async function notifyLspRelease(shipmentHash: string): Promise<void> {
  const lsp = await getLsp();
  const lspClient = createMessagingClient({
    serverUrl: lsp.nats,
  })
  await lspClient.connect();
  await lspClient.publish<string>('release', shipmentHash);
  await lspClient.disconnect();
}

export default new ShipmentController();
