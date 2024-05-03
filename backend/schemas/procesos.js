const z = require("zod");

const processesSchema = z.object({
  userId: z.number().int().positive(),
  numeroRadicado: z.string().length(22),
});

function validateProcess(object) {
  return processesSchema.safeParse(object);
}
module.exports = {
  validateProcess,
};
