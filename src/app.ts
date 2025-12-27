import express from "express";
import dotevn from "dotenv";
dotevn.config({
  quiet: true,
});
const app = express();
app.use(express.json());

//router imports
import tableRouter from "./router/table.route.js";
import attributeRouter from "./router/attribute.router.js";
import evaluateRouter from "./router/evaluate.schema.js";
import valueRouter from "./router/value.router.js";

app.use("/data-table", tableRouter);
app.use("/table", attributeRouter);
app.use("/table", evaluateRouter);
app.use("/table", valueRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
