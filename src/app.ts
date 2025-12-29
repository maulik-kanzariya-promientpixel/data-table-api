import express from "express";

const app = express();
app.use(express.json());

import instanceIdMiddleware from "./middleware/instanceId.middleware.js";
import tableRouter from "./router/table.route.js";
import attributeRouter from "./router/attribute.router.js";
import evaluateRouter from "./router/evaluate.schema.js";
import valueRouter from "./router/value.router.js";

app.use("/instance/:instanceId/data-table", instanceIdMiddleware, tableRouter);
app.use("/instance/:instanceId/table", instanceIdMiddleware, attributeRouter);
app.use("/instance/:instanceId/table", instanceIdMiddleware, evaluateRouter);
app.use("/instance/:instanceId/table", instanceIdMiddleware, valueRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
