import type { MetadataBearer } from "@aws-sdk/types";
import type { Response } from "express";
import { ZodError } from "zod";

export interface WrappedAwsError extends Error {
  awsCode?: string;
  awsMessage?: string;
  awsMetadata?: MetadataBearer["$metadata"];
  cause?: unknown;
}

export function wrapAwsError(
  service: string,
  action: string,
  awsError: unknown,
): WrappedAwsError {
  const err = new Error(
    `Error occurred at: [${service}] [${action}]`,
  ) as WrappedAwsError;

  err.cause = awsError;

  if (typeof awsError === "object" && awsError !== null) {
    const awsErr = awsError as Partial<Error & MetadataBearer>;

    err.awsCode = awsErr.name || "UNKNOWN";
    err.awsMessage = awsErr.message || "";
    err.awsMetadata = awsErr.$metadata || {};
  }
  console.log("{Error utils}" + err);
  return err;
}

export function handleControllerError(res: Response, err: unknown) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: err.issues.map((issue) => issue.message),
    });
  }

  if (err instanceof Error && "awsMetadata" in err) {
    const wrappedErr = err as WrappedAwsError;
    return res.status(wrappedErr.awsMetadata?.httpStatusCode || 500).json({
      error: wrappedErr.awsMessage || wrappedErr.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}
