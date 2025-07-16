import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  SECRET_KEY: z.string().default("SECRETKEY"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("-> LOG: Your environment variables aren't correct!");
} else {
  console.log("-> LOG: Enviroment variables are checked, all ok!");
}

export const env = _env.data;
