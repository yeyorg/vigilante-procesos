import { ProcessModel } from "../models/ProcessModel.js";
import { validateProcess } from "../schemas/processes.js";

export class ProcessController {
  static async getProcesses(req, res) {
    return res.json(await ProcessModel.getAll());
  }

  static async getById(req, res) {
    const { id } = req.params;
    const filteredProcesses = await ProcessModel.getById({ id });

    return res.json(filteredProcesses);
  }

  static async create(req, res) {
    const validatedProcess = validateProcess(req.body);

    if (!validatedProcess.success) {
      return res
        .status(422)
        .json({ error: JSON.parse(validatedProcess.error.message) });
    }

    const newProcess = await ProcessModel.create({
      input: validatedProcess.data,
    });
    res.json(newProcess);
  }
}
