import type { Request, Response } from "express";
import { handleControllerError } from "../utils/error.helper.js";
import {
  EvaluateDataTableRequestSchema,
  searchTableSchema,
} from "../utils/evaluation.schema.js";
import searchTable from "../services/evaluate/search.service.js";
import { evaluteTable } from "../services/evaluate/evaluate.service.js";

export async function searchDataTable(req: Request, res: Response) {
  try {
    const parsedData = searchTableSchema.parse(req.body);

    const tables = await searchTable(
      req.instanceId,
      parsedData.operationType,
      parsedData.name,
      parsedData.description,
      parsedData.tags
    );

    return res.status(200).json({
      tables,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function evaluteDataTable(req: Request, res: Response) {
  try {
    const parsedData = EvaluateDataTableRequestSchema.parse(req.body);

    const evaluatedData = await evaluteTable(
      req.instanceId,
      req.tableId,
      parsedData.timezone,
      parsedData.values
    );

    return res.status(200).json({
      message: "Data table evaluation completed",
      data: evaluatedData,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}
