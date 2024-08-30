import { Router } from "express";
import { validateProcess } from "../schemas/procesos.js";
import { randomUUID } from "node:crypto";
import { ProcessModel } from "../models/process.js";

export const processRouter = Router();

processRouter.get("/", async (req, res) => {
  const { userId } = req.query;
  const filteredProcess = await ProcessModel.getById({ userId });
  return res.json(filteredProcess);
});

processRouter.post("/", (req, res) => {
  const validatedProcess = validateProcess(req.body);

  if (!validatedProcess.success) {
    return res
      .status(422)
      .json({ error: JSON.parse(validatedProcess.error.message) });
  }

  //  Insert new process
  const newProcess = {
    id: randomUUID(),
    ...validatedProcess.data,
  };

  res.json(newProcess);
});
