import express, { json } from "express";
import { addShipment, getAllShipments } from "../db/shipment_queries";
import { Cargo } from "../models/cargo";
import { CreateShipmentObject, Shipment } from "../models/shipment";
import { successMessage } from "./helpers/status";
import web3 from "web3";
import { createMessagingClient } from "messaging";
import { Offer } from "../models/offer";
import { tm } from "../services/token";
import { getParticipant } from "../db/participant_queries";
import { Participant } from "../models/participant";

class ShipmentController {
  async getAll(req: express.Request, res: express.Response) {
    const shipments = await getAllShipments();
    res.status(200).send(shipments);
  }

  // Only to be called as LSP
  async post(req: express.Request, res: express.Response) {
    const create = req.body as CreateShipmentObject;
    const cargoString = JSON.stringify(create.cargo);
    // Replace by baseline hash
    const cargoHash = web3.utils.sha3(cargoString);
    const owner = await getParticipant(create.owner);
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

  async offer(req: express.Request, res: express.Response) {
    const { shipmentId } = req.params;
    const shipmentIdInt = parseInt(shipmentId);
    const price = parseFloat(req.body.price);
    const buyback = parseFloat(req.body.buyback);
    const offer: Offer = {
      id: -1,
      owner: "importer",
      shipmentId: shipmentIdInt,
      contractAddress: "0x1234",
      price: price,
      buyback: buyback,
    }
    successMessage.data = offer;
    // const offer = await createOffer()
    // insert into own db
    // send offer to all the subscribed financers
    res.send(successMessage);
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

export default new ShipmentController();
