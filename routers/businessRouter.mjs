import express from "express";
import BusinessesController from "../controllers/businessesController.mjs";

const businessesRouter = express.Router();
const businessesController = new BusinessesController();

businessesRouter.post('/', businessesController.createBusiness);

businessesRouter.get('/', businessesController.getBusinesses);
businessesRouter.get('/:id', businessesController.getBusiness);

businessesRouter.patch('/:id', businessesController.updateBusiness);

businessesRouter.delete('/:id', businessesController.deleteBusiness);

export default businessesRouter;