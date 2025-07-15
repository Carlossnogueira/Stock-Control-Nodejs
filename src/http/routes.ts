import { FastifyInstance } from 'fastify'
import { registerUser } from '../http/controllers/User/registerUser'
import { loginUser } from './controllers/User/loginUser'
import { verifyJWT } from '../middlewares/verifyJWT'

export async function appRoutes(app : FastifyInstance) {
    app.post('/register', registerUser)

    app.post('/login', loginUser)

    // Just a test
    app.get('/jwtvalidation', {preHandler: [verifyJWT] }, async (request,response) => {
        const user = await request.jwtVerify()
        return { user }
    })
}