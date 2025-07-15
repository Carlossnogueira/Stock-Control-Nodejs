import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { loginUserUseCase } from "../../user-cases/User/loginUserUseCase";
import { app } from "../../app";


export async function loginUser(request: FastifyRequest, reply: FastifyReply) {


    const userRequestSchema = z.object({
        email: z.email('Email is required.'),
        password: z.string('Password is required.')
    })

    const { email, password } = userRequestSchema.parse(request.body)

    try {

        const user = await loginUserUseCase({ password, email })

        if (user) {
            const token = await reply.jwtSign(
                {
                    id: user.id,
                    email: user.email
                },
                {
                    expiresIn: '7d'
                }
            )

            return reply.status(200).send({
                message: 'User logged in!',
                token
            })

        }


    } catch (e) {
        return reply.status(401).send(e)
    }

}