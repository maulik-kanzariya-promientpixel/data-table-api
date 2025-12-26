import { Router } from "express";
import {
  evaluteDataTable,
  searchDataTable,
} from "../controller/evaluate.controller.js";

const evaluateRouter = Router();

evaluateRouter.post("/search", searchDataTable);
evaluateRouter.post("/evaluate", evaluteDataTable);

export default evaluateRouter;
