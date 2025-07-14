import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserUseCase } from '../../user-cases/registerUserUseCase'
import { z } from 'zod'

export async function registerUser(request : FastifyRequest, reply : FastifyReply) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        password: z.string().min(8),
        email: z.email()
    })

    const { name, password, email } = registerBodySchema.parse(request.body)
    
    

    try{
        await registerUserUseCase({name,email,password})
    } catch (e){
        return reply.status(409).send(e)
    }
   
    return reply.status(201).send('User created!')
}