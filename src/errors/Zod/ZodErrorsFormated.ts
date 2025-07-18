import { z } from "zod";

export async function ZodErrorsFormated(zodErrorClass: z.ZodError) {
  const errors = zodErrorClass.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
  return errors;
}
