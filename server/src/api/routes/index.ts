import { Router } from "express";
import diseaseRouter from "./disease";
import questionsRouter from "./questions";

const apiRouter = Router();

apiRouter.use("/disease", diseaseRouter);
apiRouter.use("/questions", questionsRouter);

export default apiRouter;
