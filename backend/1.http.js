import express, { json } from "express";
import { processRouter } from "./routes/processes.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable("x-powered-by");
app.use(corsMiddleware());
app.use(json());

app.use("/procesos", processRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "This resource does not exist" });
});

app.listen(PORT, () => {
  console.log(`listening server on http://localhost:${PORT}`);
});
