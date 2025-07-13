import { app } from "./app";
import { env } from "./env/envconfig";

app.listen({ port: env.PORT, host: "0.0.0.0"})
    .then(() => {
        console.log("LOG: Server is up!")
    }).catch((e) => {
        console.log("ERROR: Error to start server!" + e)
    })

