import { Router } from "express";
import {
  evaluteDataTable,
  searchDataTable,
} from "../controller/evaluate.controller.js";
import tableIdMiddleware from "../middleware/tableId.middleware.js";

const evaluateRouter = Router();

evaluateRouter.post("/search", searchDataTable);
evaluateRouter.post("/:tableId/evaluate", tableIdMiddleware, evaluteDataTable);

export default evaluateRouter;
