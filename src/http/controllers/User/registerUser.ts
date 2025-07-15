import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserUseCase } from '../../../user-cases/User/registerUserUseCase'
import { z } from 'zod'

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        
        name: z.string({
            message: "Name is required.",
        }).min(6, {
            message: "Name must be at least 6 characters long."
        }),
        password: z.string({
            message: "Password is required.",
        }).min(8, {
            message: "Password must be at least 8 characters long."
        }),
        email: z.string({
            message: "Email is required.",
        }).email({
            message: "Please provide a valid email address."
        })
    })

    try {
    
        const { name, password, email } = registerBodySchema.parse(request.body)

       
        await registerUserUseCase({ name, email, password })

        return reply.status(201).send({
            message: 'User created success'
        })

    } catch (error) {
       
        if (error instanceof z.ZodError) {
            const errors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))

            return reply.status(400).send({
                message: "Error to validate user request",
                errors
            })
        }


        const errorMessage = error instanceof Error
            ? error.message
            : "Unkwon error to register user."

        return reply.status(500).send({
            message: "Internal server error.",
            error: errorMessage
        })
    }
}