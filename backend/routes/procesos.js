import { Router } from "express";
import { ProcessController } from "../controllers/ProcessController.js";

export const processRouter = Router();

processRouter.get("/", ProcessController.getAll);

processRouter.get("/:id", ProcessController.getById);

processRouter.post("/", ProcessController.create);
