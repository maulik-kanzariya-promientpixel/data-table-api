import type { Request, Response } from "express";
import { handleControllerError } from "../utils/error.helper.js";
import {
  batchDeleteValueSchema,
  batchDescribeSchema,
  batchValue,
  getValuesSchema,
  updatePrimaryValueSchema,
} from "../utils/value.schema.js";

import {
  batchCreateValue,
  batchDeleteValue,
  batchDescribeValue,
  batchUpdateValue,
  listTablePrimaryValue,
  listValues,
  updateTablePrimaryValue,
} from "../services/value/index.js";

export async function getValues(req: Request, res: Response) {
  try {
    const parsed = getValuesSchema.parse(req.body);

    const values = await listValues(
      req.tableId,
      parsed?.recordIds,
      parsed?.primaryValues
    );

    res.status(200).json({
      values,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function getPrimaryValues(req: Request, res: Response) {
  try {
    const parsed = getValuesSchema.parse(req.body);

    const values = await listTablePrimaryValue(
      req.tableId,
      parsed?.recordIds,
      parsed?.primaryValues
    );

    return res.status(200).json({
      values,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function updatePrimaryValue(req: Request, res: Response) {
  try {
    console.log(req.body);

    const { primaryValue, newPrimaryValue } = updatePrimaryValueSchema.parse(
      req.body
    );

    const updatedValues = await updateTablePrimaryValue(
      req.tableId,
      primaryValue,
      newPrimaryValue
    );

    res.status(200).json({
      lockVersion: updatedValues,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function batchCreateTableValues(req: Request, res: Response) {
  try {
    const parsed = batchValue.parse(req.body);

    const createValueResult = await batchCreateValue(
      req.tableId,
      parsed.values
    );

    return res.status(200).json({ values: createValueResult });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function batchUpdateTableValues(req: Request, res: Response) {
  try {
    const parsed = batchValue.parse(req.body);

    const updatedValues = await batchUpdateValue(req.tableId, parsed.values);

    return res.status(200).json({ values: updatedValues });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function batchDeleteTableValues(req: Request, res: Response) {
  try {
    const parsed = batchDeleteValueSchema.parse(req.body);

    const deletedValues = await batchDeleteValue(req.tableId, parsed.values);

    return res.status(200).json({ values: deletedValues });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function batchDescribeTableValues(req: Request, res: Response) {
  try {
    const parsed = batchDescribeSchema.parse(req.body);

    const deletedValues = await batchDescribeValue(req.tableId, parsed.values);

    return res.status(200).json({ values: deletedValues });
  } catch (error) {
    return handleControllerError(res, error);
  }
}
