import express from "express";

class OfferController {
  getAll(req: express.Request, res: express.Response) {
    res.status(200).send([]);
  }

  post(req: express.Request, res: express.Response) {
    // Deploy escrow
    //
    res.status(201).send({});
  }
}

export default new OfferController();
