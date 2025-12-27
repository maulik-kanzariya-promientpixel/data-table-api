import { Router } from "express";
import tableIdMiddleware from "../middleware/tableId.middleware.js";
import {
  batchCreateTableValues,
  batchDeleteTableValues,
  batchDescribeTableValues,
  batchUpdateTableValues,
  getPrimaryValues,
  getValues,
  updatePrimaryValue,
} from "../controller/values.controller.js";

const valueRouter = Router();

valueRouter.get("/:tableId/values", tableIdMiddleware, getValues);
valueRouter.get(
  "/:tableId/primary-values",
  tableIdMiddleware,
  getPrimaryValues
);

valueRouter.post(
  "/:tableId/primary-values",
  tableIdMiddleware,
  updatePrimaryValue
);

valueRouter.post("/:tableId/values", tableIdMiddleware, batchCreateTableValues);

valueRouter.put("/:tableId/values", tableIdMiddleware, batchUpdateTableValues);

valueRouter.delete(
  "/:tableId/values",
  tableIdMiddleware,
  batchDeleteTableValues
);

valueRouter.get("/:tableId/value", tableIdMiddleware, batchDescribeTableValues);

export default valueRouter;
