import express from "express";
import { OrganizationController, OfferController, WorkflowController } from "../controllers";

const apiRouter = express.Router();

// Organization Routes
apiRouter.get("/organizations", OrganizationController.getAll);
apiRouter.post("/organizations", OrganizationController.post);

// Workflow Routes
apiRouter.get("/workflows", WorkflowController.getAll);

// Offer Routes
apiRouter.get("/offers", OfferController.getAll);
apiRouter.post("/offers", OfferController.post);

export default apiRouter;
