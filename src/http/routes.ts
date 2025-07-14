import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/registerUser'

export async function appRoutes(app : FastifyInstance) {
    app.post('/user', registerUser)
}