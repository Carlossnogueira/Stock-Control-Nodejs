import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { loginUserUseCase } from "../../../user-cases/User/loginUserUseCase";
import { ZodErrorsFormated } from "../../../errors/Zod/ZodErrorsFormated";

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
  const userRequestSchema = z.object({
    email: z.email({
      message: "Please provide a valid email address.",
    }),
    password: z
      .string({
        message: "Password is required.",
      })
      .min(8, {
        message: "Password must be at least 8 characters long.",
      }),
  });

  try {
    const { email, password } = userRequestSchema.parse(request.body);

    const user = await loginUserUseCase({ password, email });

    if (user) {
      const token = await reply.jwtSign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: "7d",
        }
      );

      return reply.status(200).send({
        message: "User logged in!",
        token,
      });
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
      e instanceof Error ? e.message : "Unknow errror to register user";

    return reply.status(400).send({
      error: errorMessage,
    });
  }
}
