import { Router } from "express";
import {
  listDataTables,
  createDataTable,
  deleteDataTable,
  getDataTableById,
  updateDataTable,
} from "../controller/table.controller.js";

const tableRouter = Router();

tableRouter.get("/", listDataTables);
tableRouter.post("/", createDataTable);
tableRouter.delete("/:tableId", deleteDataTable);
tableRouter.get("/:tableId", getDataTableById);
tableRouter.put("/:tableId", updateDataTable);

export default tableRouter;
