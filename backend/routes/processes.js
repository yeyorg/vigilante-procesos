import { Router } from "express";
import { ProcessController } from "../controllers/ProcessController.js";

export const processRouter = Router();

processRouter.get("/", ProcessController.getProcesses);

processRouter.get("/:id", ProcessController.getById);

processRouter.post("/", ProcessController.create);
