import express from "express";
import { addShipment, getAllShipments } from "../db/shipment_queries";
import { CreateShipment } from "../models/shipment";
import { successMessage } from "./helpers/status";

class ShipmentController {
  async getAll(req: express.Request, res: express.Response) {
    const shipments = await getAllShipments();
    res.status(200).send(shipments);
  }

  async post(req: express.Request, res: express.Response) {
    const shipment = await addShipment(req.body as CreateShipment);
    successMessage.data = shipment
    res.status(201).send(successMessage);
  }

  async offer(req: express.Request, res: express.Response) {
    const { shipmentId } = req.params;
    const price = req.body.price;
    const buyback = req.body.buyback;

    // insert into own db
    // send offer to all the subscribed financers
  }
}

export default new ShipmentController();
