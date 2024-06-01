import { Router } from "express";
import * as questionsController from "../../controllers/questions";

const questionsRouter = Router();

questionsRouter.get("/:testName", questionsController.getQuestions);

export default questionsRouter;
