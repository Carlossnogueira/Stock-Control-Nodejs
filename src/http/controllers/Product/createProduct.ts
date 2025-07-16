import { FastifyReply, FastifyRequest } from "fastify";
import { createNewProduct } from "../../../user-cases/Product/createProductUseCase";
import z from "zod";

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = await request.jwtVerify();

  const productSchema = z.object({
    name: z.string().min(1, "Product require a name"),
    sku: z.optional(z.string()),
    quantity: z.coerce
      .number()
      .min(1, "Min one of this product")
      .max(999, "Max 999 of this product"),
    category: z.coerce.number().min(1, "Product need a category"),
    min_quantity: z.coerce
      .number()
      .min(1, "Min one of this product")
      .max(999, "Max 999 of this product"),
    max_quantity: z.coerce
      .number()
      .min(1, "Min one of this product")
      .max(999, "Max 999 of this product"),
    price_cost: z.coerce.number().min(0.1, "Min 1 cent of product cost"),
    price_sale: z.coerce
      .number()
      .min(0.1, "Min 1 cent of product cost for sale"),
    supplier_id: z.optional(z.number()),
  });

  try {
    const {
      name,
      sku,
      quantity,
      category,
      min_quantity,
      max_quantity,
      price_cost,
      price_sale,
      supplier_id,
    } = productSchema.parse(request.body);

    const product = {
      name: name,
      sku: sku,
      quantity: quantity,
      category: { connect: { id: category } },
      min_quantity: min_quantity,
      max_quantity: max_quantity,
      price_cost: price_cost,
      price_sale: price_sale,
      supplier_id: supplier_id ? { connect: { id: supplier_id } } : undefined,
    };

    await createNewProduct(product);

    if (!createNewProduct) {
      return reply.status(400).send("Error to create this product");
    }

    return reply.status(201).send("Product created!");
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = e.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return reply.status(400).send({
        message: "Error to register this product",
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
