import type { NextFunction, Request, Response } from "express";
import { handleControllerError } from "../utils/error.helper.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableId } = req.params;

    if (!tableId) {
      return res.status(400).json({
        message: "Table id is required",
      });
    }

    req.tableId = tableId;

    next();
  } catch (error) {
    return handleControllerError(res, error);
  }
};
