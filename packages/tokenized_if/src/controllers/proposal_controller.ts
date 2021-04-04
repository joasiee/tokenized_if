import express from "express";

class ProposalController {
  getAll(req: express.Request, res: express.Response) {
    res.status(200).send([]);
  }

  post(req: express.Request, res: express.Response) {
    res.status(201).send({});
  }
}

export default new ProposalController();
