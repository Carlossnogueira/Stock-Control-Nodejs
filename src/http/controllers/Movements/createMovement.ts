import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";
import { createNewMovement } from "../../../user-cases/Movement/createMovement";

export async function createMovement(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const movementSchema = z.object({
    product_id: z.coerce.number().min(1, "Invalid product ID."),
    type: z.coerce.number().min(0, "Invalid type").max(1, "Invalid type"),
    quantity: z.coerce.number().min(1, "Quantity must be greater than zero."),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters.")
      .max(255, "Description must be at most 255 characters."),
  });

  const user_id = request.user.id;

  try {
    const { product_id, type, quantity, description } =
      movementSchema.parse(request.body);

    let movementType: string = "";

    if (type === 1) movementType = "EXIT";
    if (type === 0) movementType = "ENTRY";

    const result = await createNewMovement({product_id, user_id, type: movementType, quantity, description});

    return reply.code(201).send(result);

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
