import { FastifyReply, FastifyRequest } from "fastify";
import { getAllProducts } from "../../../user-cases/Product/getAllProductUseCase";

export async function getAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply.status(200).send("No products found");
    }

    return reply.status(200).send({ products });
  } catch (e) {
    return reply.status(500).send({ message: "Server error" });
  }
}
