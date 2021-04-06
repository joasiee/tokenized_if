import express from "express";
import { addParticipant, getAllParticipants } from "../db/participant_queries";
import { Participant } from "../models/participant";
import { successMessage } from "./helpers/status";

class OrganizationController {
  async getAll(req: express.Request, res: express.Response) {
    const participants = await getAllParticipants();
    res.status(200).send(participants);
  }

  async post(req: express.Request, res: express.Response) {
    const participant = await addParticipant(req.body as Participant)
    successMessage.data = participant;
    res.status(201).send(successMessage);
  }
}

export default new OrganizationController();
