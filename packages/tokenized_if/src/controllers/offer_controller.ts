import express from "express";
import { getAllOffers } from "../db/offer_queries";

class OfferController {
  /** Returns all known offers */
  async getAll(req: express.Request, res: express.Response) {
    const offers = await getAllOffers();
    res.status(200).send(offers);
  }

  /** Should run when financer accepts an offer */
  async acceptOffer(req: express.Request, res: express.Response) {
    // vanuit financer submit
    // client connect(importer)
    // publish acceptoffer(req.hash)
    res.status(201).send({});
  }

}

export default new OfferController();
