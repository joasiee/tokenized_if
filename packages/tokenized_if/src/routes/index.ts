import express from "express";
import { OrganizationController, WorkflowController } from "../controllers";

const apiRouter = express.Router();

// Organization Routes
apiRouter.get("/organizations", OrganizationController.getAll);

// Workflow Routes
apiRouter.use("/workflows", WorkflowController.getAll);

export default apiRouter;
