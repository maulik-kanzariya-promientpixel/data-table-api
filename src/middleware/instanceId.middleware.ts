import type { NextFunction, Request, Response } from "express";
import { handleControllerError } from "../utils/error.helper.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { instanceId } = req.params;

    if (!instanceId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_INSTANCE_ID",
          message: "Instance ID is required in the URL path",
        },
        timestamp: new Date().toISOString(),
      });
    }

    req.instanceId = instanceId;
    next();
  } catch (error) {
    return handleControllerError(res, error);
  }
};
