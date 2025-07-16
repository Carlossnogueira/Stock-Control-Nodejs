import { FastifyReply, FastifyRequest } from "fastify";
import { createNewCategory } from "../../../user-cases/Category/createCategoryUseCase"
import z from "zod";

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categorySchema = z.object({
    name: z
      .string()
      .min(1, "Min 1 character to create a category.")
      .max(50, "Max 50 characters."),
  });

  try {

    const { name } = categorySchema.parse(request.body);

    const result = await createNewCategory(name)

    if(result === false ){
        return reply.status(401).send('Fail to create this category.')
    }

    return reply.status(201).send('Create success!')

  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = e.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

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
