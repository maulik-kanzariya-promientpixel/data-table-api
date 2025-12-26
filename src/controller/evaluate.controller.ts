import type { Request, Response } from "express";
import { handleControllerError } from "../utils/error.helper.js";
import { searchTableSchema } from "../utils/evaluation.schema.js";
import searchTable from "../services/evaluate/search.service.js";

export async function searchDataTable(req: Request, res: Response) {
  try {
    const parsedData = searchTableSchema.parse(req.body);

    const tables = await searchTable(
      parsedData.operationType,
      parsedData.name,
      parsedData.description,
      parsedData.tags,
    );

    return res.status(200).json({
      tables,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function evaluteDataTable(req: Request, res: Response) {}
