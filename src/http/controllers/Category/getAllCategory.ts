import { FastifyReply, FastifyRequest } from "fastify";
import { getAllCategories as getAll } from "../../../user-cases/Category/getAllCategoryUseCase";

export async function getAllCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const response = await getAll();
    if (response.length === 0) {
      return reply.status(200).send("Categories is empty");
    }

    return reply.status(200).send({ Categories: response });
  } catch (e) {
    console.log(e);
  }
}
