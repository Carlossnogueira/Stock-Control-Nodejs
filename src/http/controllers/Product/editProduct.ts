import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { updateProduct } from "../../../user-cases/Product/updateProductUseCase";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function editProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idSchema = z.object({
    id: z.string("Id is required"),
  });

  const productSchema = z.object({
    name: z.string().min(1).max(100),
    sku: z.string().optional(),
    quantity: z.number().int(),
    min_quantity: z.number().int(),
    max_quantity: z.number().int(),
    price_cost: z.number(),
    price_sale: z.number(),
    category_id: z.number().int(),
    supplier_id: z.number().int().optional(),
  });

  try {
    const { id } = idSchema.parse(request.params);
    const productData = productSchema.parse(request.body);

    await updateProduct(parseInt(id), productData);

    return reply.status(200).send({ message: "Product updated successfully" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = await ZodErrorsFormated(e);
      return reply.status(400).send({ message: "Validation failed", errors });
    }

    const errorMessage =
      e instanceof Error ? e.message : "Unknown error while updating product";

    return reply.status(400).send({ message: "Bad request", error: errorMessage });
  }
}
