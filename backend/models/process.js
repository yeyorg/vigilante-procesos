import { readJSON } from "../utils.js";

const procesos = readJSON("./mocks/procesos.json");

export class ProcessModel {
  static async getById({ userId }) {
    if (userId) {
      return procesos.filter(
        //  userId is an Integer
        (process) => process.userId === +userId
      );
    }
    return procesos;
  }
}
