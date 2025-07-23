import { FastifyReply, FastifyRequest } from "fastify";
import { getAllSuppliers } from "../../../user-cases/Supplier/getAllSupplierUseCase";

export async function getAllSuppliersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const suppliers = await getAllSuppliers();

    if (suppliers.length === 0) {
      return reply.status(200).send("No suppliers found");
    }

    return reply.status(200).send({ suppliers });
  } catch (e) {
    console.error(e);
    return reply.status(500).send({ message: "Server error" });
  }
}
