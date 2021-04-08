import express from "express";
import { getAllOffers, getOfferById } from "../db/offer_queries";
import { getParticipant, getParticipantById } from "../db/participant_queries";
import { Participant } from "../models/participant";
import { createMessagingClient } from "messaging";
import { AcceptOffer } from "../models/offer";
import { tm } from "../services/token";

class OfferController {
  /** Returns all known offers */
  async getAll(req: express.Request, res: express.Response) {
    const offers = await getAllOffers();
    res.status(200).send(offers);
  }

  /** Should run when financer accepts an offer */
  async acceptOffer(req: express.Request, res: express.Response) {
    const { offerId } = req.params;
    const offerIdInt = parseInt(offerId);
    const offer = await getOfferById(offerIdInt);
    const importer = await getParticipant(offer.shipment.owner);
    const accept : AcceptOffer = {
      cargo_hash: offer.shipment.cargo_hash,
      financer_address: tm.signer.address,
    };
    const accepted = await notifyImporterAccept(importer, accept);
    if (accepted) {
      const escrow = tm.connectEscrowInstance(offer.shipment.escrow_address, tm.signer);
      await tm.sendEther(tm.signer.address, escrow.address, offer.price, tm.private_key);
      console.log("Current Holder: ", await escrow.holder());
    }
    
    res.status(201).send(true);
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
