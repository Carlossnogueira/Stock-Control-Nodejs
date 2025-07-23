import { FastifyInstance } from "fastify";
import { registerUser } from "../http/controllers/User/registerUser";
import { loginUser } from "./controllers/User/loginUser";
import { verifyJWT } from "../middlewares/verifyJWT";
import { createProduct } from "./controllers/Product/createProduct";
import { createCategory } from "./controllers/Category/createCategory";
import { createSupplier } from "./controllers/Supplier/createSupplier";
import { getAllCategories } from "./controllers/Category/getAllCategory";
import { removeCategory } from "./controllers/Category/removeCategory";
import { editCategory } from "./controllers/Category/editCategory";
import { getAllSuppliers } from "../user-cases/Supplier/getAllSupplierUseCase";
import { editSupplier } from "./controllers/Supplier/editSupplier";
import { removeSupplierController } from "./controllers/Supplier/removeSupplier";

export async function appRoutes(app: FastifyInstance) {
  // User Routes

  app.post("/register", registerUser);
  app.post("/login", loginUser);

  // Product Routes

  app.post("/product", { preHandler: [verifyJWT] }, createProduct);


  // Category Routes

  app.post("/category", { preHandler: [verifyJWT] }, createCategory);
  app.get("/category", { preHandler: [verifyJWT] }, getAllCategories);
  app.delete("/category/:id", {preHandler: [verifyJWT] }, removeCategory);
  app.patch("/category/:id" , {preHandler: [verifyJWT] }, editCategory);
  


  // Supplier Routes

  app.post("/supplier", { preHandler: [verifyJWT] }, createSupplier);
  app.get("/supplier", {preHandler: [verifyJWT] }, getAllSuppliers);
  app.delete("/supplier/:id", {preHandler: [verifyJWT] }, removeSupplierController);
  app.patch("/supplier/:id" , {preHandler: [verifyJWT] }, editSupplier);

  
  // TODO crud product
}
