import { FastifyReply, FastifyRequest } from "fastify";
import { removeCategory as remove } from "../../../user-cases/Category/removeCategoryUseCase";
import z from "zod";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function removeCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idSchema = z.object({
    id: z.string("Id can't be empty"),
  });

  console.table(request.params);

  try {
    const { id } = idSchema.parse(request.params);

    const result = await remove(Number(id));

    if (result) {
      return reply.code(200).send("Category deleted");
    } else {
      return reply
        .code(200)
        .send("One product use this category, deleted it first!");
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = await ZodErrorsFormated(e);

      return reply.status(400).send({
        message: "Error to registe this product",
        errors,
      });
    }

    const errorMessage =
      e instanceof Error ? e.message : "Unknow error to delete category";

    return reply.status(400).send({
      message: "Bad request",
      error: errorMessage,
    });
  }
}
