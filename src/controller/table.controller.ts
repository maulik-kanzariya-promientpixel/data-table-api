import type { Request, Response } from "express";
import {
  CreateDataTableSchema,
  UpdateDataTableSchema,
} from "../utils/table.schema.js";

import { handleControllerError } from "../utils/error.helper.js";

//table services
import {
  listTables,
  createTable,
  deleteTable,
  getTableById,
  updateTable,
} from "../services/table/index.js";

export async function listDataTables(_: Request, res: Response) {
  try {
    const tablesList = await listTables();
    return res.status(200).json({
      list: tablesList,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function createDataTable(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const parsedData = CreateDataTableSchema.parse(req.body);

    const data = {
      name: parsedData.name,
      timezone: parsedData.timezone,
      valueLockLevel: parsedData.valueLockLevel,
      ...(parsedData.description &&
        parsedData.description !== "" && {
          description: parsedData.description,
        }),
      ...(parsedData.status && { status: parsedData.status }),
      ...(parsedData.tags &&
        Object.keys(parsedData.tags).length > 0 && {
          tags: parsedData.tags,
        }),
    };

    const table = await createTable(data);

    return res.status(201).json(table);
  } catch (err) {
    return handleControllerError(res, err);
  }
}

export async function deleteDataTable(req: Request, res: Response) {
  try {
    const { tableId } = req.params;

    if (!tableId) {
      return res.status(400).json({
        message: "Table id is required in url",
      });
    }

    const deletedTable = await deleteTable(tableId);

    return res.status(200).json({
      message: "Table deleted",
      deletedTable,
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
}

export async function getDataTableById(req: Request, res: Response) {
  try {
    const { tableId } = req.params;

    if (!tableId) {
      return res.status(404).json({
        message: "Table id is required",
      });
    }
    const dataTable = await getTableById(tableId);
    res.status(200).json(dataTable);
  } catch (err) {
    return handleControllerError(res, err);
  }
}

export async function updateDataTable(req: Request, res: Response) {
  try {
    const { tableId } = req.params;

    if (!tableId) {
      return res.status(400).json({
        message: "Table Id is required",
      });
    }

    const parsedData = UpdateDataTableSchema.parse(req.body);

    const updatedDataTable = await updateTable(tableId, {
      name: parsedData.name,
      timezone: parsedData.timezone,
      description: parsedData.description,
      valueLockLevel: parsedData.valueLockLevel,
    });

    return res.status(200).json({
      message: "Table updated successfully",
      data: updatedDataTable,
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
}
