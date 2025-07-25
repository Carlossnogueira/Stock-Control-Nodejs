import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createNewSupplier } from "../../../user-cases/Supplier/createSupplierUseCase";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function createSupplier(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createSupplierSchema = z.object({
    name: z
      .string()
      .min(1, "Supplier require a name.")
      .max(50, "Max 50 characters."),
    phone: z.coerce
      .string()
      .min(11, "Write phone number with DDD, 11 digits.")
      .max(11, "Write phone number with DDD, 11 digits."),
    email: z.email("Email is not valid."),
  });

  try {
    const { name, email, phone } = createSupplierSchema.parse(request.body);

    const result = await createNewSupplier({ name, email, phone });

    return reply.status(201).send("Supplier create sucsses!");
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = await ZodErrorsFormated(e);

      return reply.status(400).send({
        message: "Error to registe this product",
        errors,
      });
    }

    const errorMessage =
      e instanceof Error ? e.message : "Unknow errror to register this product";

    return reply.status(400).send({
      message: "Bad request",
      error: errorMessage,
    });
  }
}
