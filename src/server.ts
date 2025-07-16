import { app } from "./app";
import { env } from "./env/envconfig";
import { testConnection } from "./utils/testDatabaseConnection";


testConnection()


app
  .listen({ port: env?.PORT, host: "0.0.0.0" })
  .then(() => {
    console.log("-> LOG: Application is ready.");
  })
  .catch((e) => {
    console.log("-> ERROR: Error to start server --> " + e);
  });
