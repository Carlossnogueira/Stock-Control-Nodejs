import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { removeSupplier } from "../../../user-cases/Supplier/removeSupplierUseCase";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function removeSupplierController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idSchema = z.object({
    id: z.string("Id is required"),
  });

  try {
    const { id } = idSchema.parse(request.params);

    const result = await removeSupplier(Number(id));

    if (result) {
      return reply.code(200).send("Supplier deleted");
    } else {
      return reply.code(200).send("Failed to delete supplier");
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = await ZodErrorsFormated(e);
      return reply.status(400).send({ message: "Validation error", errors });
    }

    const errorMessage =
      e instanceof Error ? e.message : "Unknown error while deleting supplier";

    return reply.status(400).send({ message: "Bad request", error: errorMessage });
  }
}
