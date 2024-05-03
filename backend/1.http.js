const express = require("express");
const procesos = require("./mocks/procesos.json");
const { validateProcess } = require("./schemas/procesos");
const cryp = require("node:crypto");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable("x-powered-by");

app.use(express.json());

app.get("/api/procesos", (req, res) => {
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

app.post("/api/procesos", (req, res) => {
  const validatedProcess = validateProcess(req.body);

  if (!validatedProcess.success) {
    return res
      .status(422)
      .json({ error: JSON.parse(validatedProcess.error.message) });
  }

  //  Insert new process
  const newProcess = {
    id: cryp.randomUUID(),
    ...validatedProcess.data,
  };

  res.json(newProcess);
});

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "This resource does not exist" });
});

app.listen(PORT, () => {
  console.log(`listening server on http://localhost:${PORT}`);
});
