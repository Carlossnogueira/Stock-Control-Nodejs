import { fastify } from "fastify";
import { appRoutes } from "./http/routes";
import { env } from "./env/envconfig";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";

export const app = fastify();


app.register(appRoutes);

app.register(fastifyCors, {
  origin: 'http://localhost:5173'
})

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
