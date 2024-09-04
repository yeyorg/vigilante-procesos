import { readJSON } from "../utils.js";
import { randomUUID } from "node:crypto";

const processes = readJSON("./mocks/procesos.json");

export class ProcessModel {
  static async getAll() {
    return processes;
  }

  static async getById({ id }) {
    if (id) {
      return processes.filter(
        //  id is an Integer
        (process) => process.id === +id
      );
    }
    return processes;
  }

  static async create({ input }) {
    //  Insert new process
    const newProcess = {
      id: randomUUID(),
      ...input,
    };
    processes.push(newProcess);
    return newProcess;
  }
}
