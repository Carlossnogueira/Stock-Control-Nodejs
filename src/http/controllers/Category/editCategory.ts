import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";
import { updateCategory } from "../../../user-cases/Category/updateCategoryUseCase";

export async function editCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idSchema = z.object({
    id: z.string("Id can't be empty"),
  });

  const categorySchema = z.object({
    name: z
      .string()
      .min(1, "Min 1 character to create a category.")
      .max(50, "Max 50 characters."),
  });

  try {
    const { id } = idSchema.parse(request.params);

    const { name } = categorySchema.parse(request.body);

    await updateCategory(parseInt(id), name);

   if(!updateCategory){
     return reply.code(404).send({ message: "Category not found" });
   }
   
   return reply.code(200).send({message: "Category updated successfully"});

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
