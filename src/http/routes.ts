import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/registerUser'
import { loginUser } from './controllers/loginUser'
import { verifyJWT } from '../middlewares/verifyJWT'
import { app } from '../app'

export async function appRoutes(app : FastifyInstance) {
    app.post('/register', registerUser)

    app.post('/login', loginUser)

    app.get('/jwtvalidation', {preHandler: [verifyJWT] }, async (request,response) => {
        const user = await request.jwtVerify()
        return { user }
    })
}