import express from 'express';
import WorkflowController from '../controllers/workflow_controller';
import OrganizationController from '../controllers/organization_controller';

const apiRouter = express.Router();

// Organization Routes
apiRouter.get('/organizations', OrganizationController.getAll);

// Workflow Routes
apiRouter.use('/workflows', WorkflowController.getAll);

export default apiRouter;
