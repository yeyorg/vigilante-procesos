import { Router } from "express";
import { readJSON } from "../utils.js";
import { validateProcess } from "../schemas/procesos.js";
import { randomUUID } from "node:crypto";

const procesos = readJSON("./mocks/procesos.json");

export const processRouter = Router();

processRouter.get("/", (req, res) => {
  const { userId } = req.query;

  if (userId) {
    const filteredProcess = procesos.filter(
      //  userId is an Integer
      (process) => process.userId === +userId
    );
    return res.json(filteredProcess);
  }
  res.json(procesos);
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
