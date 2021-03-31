import express from "express";
import { Organization } from "../models/organization";

class OrganizationController {
  getAll(req: express.Request, res: express.Response) {
    res.status(200).send([]);
  }
}

export default new OrganizationController();
