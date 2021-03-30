import express from "express";
import { Workflow } from "../models/workflow";

class WorkflowController {
    getAll(req: express.Request, res: express.Response) {
        res.status(200).send([]);
    }
}

export default new WorkflowController();