import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { updateSupplier } from "../../../user-cases/Supplier/updateSupplierUseCase";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function editSupplier(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idSchema = z.object({
    id: z.string("Id is required"),
  });

  const supplierSchema = z.object({
    name: z.string().min(1).max(100),
    phone: z.string().min(8).max(20),
    email: z.string().email("Invalid email"),
  });

  try {
    const { id } = idSchema.parse(request.params);
    const { name, phone, email } = supplierSchema.parse(request.body);

    await updateSupplier(parseInt(id), name, phone, email);

    return reply.status(200).send({ message: "Supplier updated successfully" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = await ZodErrorsFormated(e);
      return reply.status(400).send({ message: "Validation error", errors });
    }

    const errorMessage =
      e instanceof Error ? e.message : "Unknown error while updating supplier";

    return reply
      .status(400)
      .send({ message: "Bad request", error: errorMessage });
  }
}
