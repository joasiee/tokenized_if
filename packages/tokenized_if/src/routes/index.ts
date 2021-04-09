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
apiRouter.delete("/shipments/:shipmentId", ShipmentController.release);

// Offer Routes
apiRouter.get("/offers", OfferController.getAll);
apiRouter.put("/offers/:offerId/accept", OfferController.acceptOffer);
apiRouter.put("/offers/:offerId/repay", OfferController.repay);
export default apiRouter;
