import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import express from "express";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

import instanceIdMiddleware from "./middleware/instanceId.middleware.js";
import tableRouter from "./router/table.route.js";
import attributeRouter from "./router/attribute.router.js";
import evaluateRouter from "./router/evaluate.router.js";
import valueRouter from "./router/value.router.js";

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "production",
      runtime: "AWS Lambda",
    },
  });
});

app.use("/api/instance/:instanceId/tables", instanceIdMiddleware, tableRouter);
app.use(
  "/api/instance/:instanceId/tables",
  instanceIdMiddleware,
  attributeRouter
);
app.use("/api/instance/:instanceId/tables", instanceIdMiddleware, valueRouter);
app.use(
  "/api/instance/:instanceId/evaluate",
  instanceIdMiddleware,
  evaluateRouter
);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "ENDPOINT_NOT_FOUND",
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
    },
    timestamp: new Date().toISOString(),
  });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);

    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
      timestamp: new Date().toISOString(),
    });
  }
);

let serverlessExpressInstance: any;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!serverlessExpressInstance) {
    const { configure } = await import("@vendia/serverless-express");
    serverlessExpressInstance = configure({ app });
  }

  context.callbackWaitsForEmptyEventLoop = false;
  return serverlessExpressInstance(event, context);
};
