import z from "zod";

const processesSchema = z.object({
  userId: z.number().int().positive(),
  numeroRadicado: z.string().length(22),
});

export function validateProcess(object) {
  return processesSchema.safeParse(object);
}
