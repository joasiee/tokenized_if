import express from "express";
import { OrganizationController, OfferController, WorkflowController, ShipmentController } from "../controllers";

const apiRouter = express.Router();

// Organization Routes
apiRouter.get("/organizations", OrganizationController.getAll);
apiRouter.post("/organizations", OrganizationController.post);

// Workflow Routes
apiRouter.get("/workflows", WorkflowController.getAll);

// Shipment Routes
apiRouter.get("/shipments", ShipmentController.getAll);
apiRouter.post("/shipments", ShipmentController.post);
apiRouter.put("/shipments/:shipmentId", ShipmentController.offer);

// Offer Routes
apiRouter.get("/offers", OfferController.getAll);
apiRouter.post("/offers", OfferController.acceptOffer);

export default apiRouter;
