import express from "express";
import { getAllOffers, getOfferById, setFinancer } from "../db/offer_queries";
import { Participant } from "../models/participant";
import { createMessagingClient } from "@tokenized_if/messaging";
import { AcceptOffer } from "../models/offer";
import { tm } from "../services/token";
import { errorMessage, successMessage } from "./helpers/status";
import { getImporter } from "../services/baseline/helpers/organization_queries";
import { getAllParticipants } from "../db/participant_queries";

class OfferController {
  /** Returns all known offers */
  async getAll(req: express.Request, res: express.Response) {
    const offers = await getAllOffers();
    res.status(200).send(offers);
  }

  /**
   * Runs when financer accepts an offer.
   * When a financer accepts the offer, he will pay the price that was sent before as offer.
   */
  async acceptOffer(req: express.Request, res: express.Response) {
    const { offerId } = req.params;
    const offerIdInt = parseInt(offerId);
    const offer = await getOfferById(offerIdInt);
    const importer = await getImporter(offer.shipment.owner);
    const self = (await getAllParticipants())[0];
    const accept : AcceptOffer = {
      cargo_hash: offer.shipment.cargo_hash,
      financer: self.name,
    };
    const accepted = await notifyImporterAccept(importer, accept);
    if (accepted) {
      // Update offer
      await setFinancer(offerIdInt, tm.signer.address);
      console.log("Offer acceptd; You can now obtain the token");
      const escrow = tm.connectEscrowInstance(offer.shipment.escrow_address, tm.signer);
      await tm.sendEther(tm.signer.address, escrow.address, offer.price, tm.private_key);
      console.log("Token bought; Current Holder: ", await escrow.holder());
      res.send(successMessage);
    } else {
      // TODO: Delete offer
      console.log("Offer was already accepted");
      res.send(errorMessage);
    }
  }

  /**
   * The importer that will buy the token back from the financer.
   */
  async repay(req: express.Request, res: express.Response) {
    const { offerId } = req.params;
    const offerIdInt = parseInt(offerId);
    const offer = await getOfferById(offerIdInt);
    const escrow = tm.connectEscrowInstance(offer.shipment.escrow_address, tm.signer);
    const currentHolder = await escrow.holder();

    // Check if financer paid
    if (currentHolder !== tm.signer.address) {
      tm.sendEther(tm.signer.address, escrow.address, offer.buyback, tm.private_key);
      console.log("Token bought back; Current Holder: ", await escrow.holder());
      res.send(successMessage);
    } else {
      const message = "Financer has not paid yet, you are the current holder";
      console.log(message);
      errorMessage.data = message;
      res.send(errorMessage);
    }
  }
}

async function notifyImporterAccept(importer: Participant, accept: AcceptOffer) : Promise<boolean> {
  const importerClient = createMessagingClient({
    serverUrl: importer.nats,
  });
  await importerClient.connect();
  const accepted = await importerClient.request<AcceptOffer, boolean>('accept', accept);
  await importerClient.disconnect();
  return accepted;
}

export default new OfferController();
