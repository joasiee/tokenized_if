import express from "express";

class ShipmentController {
    async getAll(req: express.Request, res: express.Response) {
      res.status(200).send([]);
    }
  
    async post(req: express.Request, res: express.Response) {
      res.status(201).send(null);
    }
  }
  
  export default new ShipmentController();
  