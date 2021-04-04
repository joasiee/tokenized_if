import express from "express";
import { OrganizationController, ProposalController, WorkflowController } from "../controllers";

const apiRouter = express.Router();

// Organization Routes
apiRouter.get("/organizations", OrganizationController.getAll);

// Workflow Routes
apiRouter.get("/workflows", WorkflowController.getAll);

// Proposal Routes
apiRouter.get("/proposals", ProposalController.getAll);
apiRouter.post("/proposals", ProposalController.post);

export default apiRouter;
