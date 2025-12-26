import type { Request, Response } from "express";

import { handleControllerError } from "../utils/error.helper.js";

import {
  CreateDataTableAttributeInputSchema,
  UpdateDataTableAttributeSchema,
} from "../utils/attribute.schema.js";

import {
  createTableAttribute,
  deleteTableAttribute,
  getTableAttributeById,
  listTableAttributes,
  updateTableAttribute,
} from "../services/attributes/index.js";

export async function createAttribute(req: Request, res: Response) {
  try {
    const parsedData = CreateDataTableAttributeInputSchema.parse(req.body);

    const createdAttribute = await createTableAttribute(
      req.tableId,
      parsedData.name,
      parsedData.valueType,
      parsedData.description,
      parsedData.primary,
      parsedData.validation,
    );

    return res.status(201).json({
      message: "Attribute created successfully",
      data: createdAttribute,
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
}

export async function deleteAttribute(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

    const deletedAttribute = await deleteTableAttribute(req.tableId, name);

    return res.status(200).json({
      message: "Table Attribute deleted sucesfully",
      deletedAttribute,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function listAttributes(req: Request, res: Response) {
  try {
    const attributes = await listTableAttributes(req.tableId);

    res.status(200).json({ attributes });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function getAttributeById(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const attribute = await getTableAttributeById(req.tableId, name);

    res.status(200).json({
      attribute,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function updateAttribute(req: Request, res: Response) {
  try {
    const parsedData = UpdateDataTableAttributeSchema.parse(req.body);

    const updateData = {
      ...(parsedData.newName && { newName: parsedData.newName }),
      ...(parsedData.description &&
        parsedData.description !== "" && {
          description: parsedData.description,
        }),
      ...(parsedData.primary !== undefined && {
        primary: parsedData.primary,
      }),
      ...(parsedData.validation && {
        validation: parsedData.validation,
      }),
    };

    const updatedAttribute = await updateTableAttribute(
      req.tableId,
      parsedData.name,
      parsedData.valueType,
      updateData,
    );

    return res.status(200).json({
      message: "attribute updated successfully",
      data: updatedAttribute,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}
