import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decode = await request.jwtVerify();
    
    
    request.user = {
      id : Number(decode.id)
    }
    
  } catch (err) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}
