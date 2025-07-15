import { fastify } from 'fastify'
import { appRoutes } from './http/routes'
import { env } from './env/envconfig'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(appRoutes)

app.register(fastifyJwt, {
    secret: env.SECRET_KEY
})


