import express, { json } from "express";
import { addShipment, getAllShipments } from "../db/shipment_queries";
import { Cargo } from "../models/cargo";
import { CreateShipmentObject } from "../models/shipment";
import { successMessage } from "./helpers/status";
import web3 from "web3";
import { createOffer } from "../db/offer_queries";

class ShipmentController {
  async getAll(req: express.Request, res: express.Response) {
    const shipments = await getAllShipments();
    res.status(200).send(shipments);
  }

  async post(req: express.Request, res: express.Response) {
    const create = req.body as CreateShipmentObject;
    const cargoString = JSON.stringify(create.cargo);
    const cargo_hash = web3.utils.sha3(cargoString);
    const shipment = await addShipment({owner: create.owner, cargo: cargoString, cargo_hash: cargo_hash});
    successMessage.data = shipment;
    res.status(201).send(successMessage);
  }

  async offer(req: express.Request, res: express.Response) {
    const { shipmentId } = req.params;
    const price = req.body.price;
    const buyback = req.body.buyback;
    // const offer = await createOffer()
    // insert into own db
    // send offer to all the subscribed financers
  }
}

export default new ShipmentController();
