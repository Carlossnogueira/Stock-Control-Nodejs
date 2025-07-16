import { FastifyInstance } from "fastify";
import { registerUser } from "../http/controllers/User/registerUser";
import { loginUser } from "./controllers/User/loginUser";
import { verifyJWT } from "../middlewares/verifyJWT";
import { createProduct } from "./controllers/Product/createProduct";
import { createCategory } from "./controllers/Category/createCategory";
import { createSupplier } from "./controllers/Supplier/createSupplier";

export async function appRoutes(app: FastifyInstance) {
  // User Routes

  app.post("/register", registerUser);

  app.post("/login", loginUser);

  // Product Routes

  app.post("/product", { preHandler: [verifyJWT] }, createProduct);

  // Category Routes

  app.post("/category", { preHandler: [verifyJWT] }, createCategory);


  // Supplier Routes

  app.post("/supplier", { preHandler: [verifyJWT] } , createSupplier)
}
