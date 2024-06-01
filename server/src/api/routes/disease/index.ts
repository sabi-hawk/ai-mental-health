import { Router } from "express";
import * as diseaseController from "../../controllers/disease";

const diseaseRouter = Router();

diseaseRouter.get("/", diseaseController.getDiseaseList);

export default diseaseRouter;
