import { readJSON } from "../utils.js";
import { randomUUID } from "node:crypto";

const procesos = readJSON("./mocks/procesos.json");

export class ProcessModel {
  static async getAll() {
    return procesos;
  }

  static async getById({ id }) {
    if (id) {
      return procesos.filter(
        //  id is an Integer
        (process) => process.id === id
      );
    }
    return procesos;
  }

  static async create({ input }) {
    //  Insert new process
    const newProcess = {
      id: randomUUID(),
      ...input,
    };
    procesos.push(newProcess);
    return newProcess;
  }
}
