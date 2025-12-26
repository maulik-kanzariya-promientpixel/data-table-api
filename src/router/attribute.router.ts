import { Router } from "express";
import {
  createAttribute,
  deleteAttribute,
  getAttributeById,
  listAttributes,
  updateAttribute,
} from "../controller/attribute.controller.js";
import tableIdMiddleware from "../middleware/tableId.middleware.js";

const attributeRouter = Router();

attributeRouter.post("/:tableId/attribute", tableIdMiddleware, createAttribute);

attributeRouter.delete(
  "/:tableId/attribute",
  tableIdMiddleware,
  deleteAttribute,
);

attributeRouter.get("/:tableId/attributes", tableIdMiddleware, listAttributes);

attributeRouter.get("/:tableId/attribute", tableIdMiddleware, getAttributeById);

attributeRouter.put("/:tableId/attribute", tableIdMiddleware, updateAttribute);

export default attributeRouter;
