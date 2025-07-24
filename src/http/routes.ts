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
import { getAllProducts } from "../user-cases/Product/getAllProductUseCase";
import { removeProductController } from "./controllers/Product/removeProduct";
import { editProduct } from "./controllers/Product/editProduct";
import { createMovement } from "./controllers/Movements/createMovement";

export async function appRoutes(app: FastifyInstance) {


  app.post("/register", registerUser);
  app.post("/login", loginUser);

  app.post("/product", { preHandler: [verifyJWT] }, createProduct);
  app.get("/product", { preHandler: [verifyJWT] }, getAllProducts);
  app.delete("/product/:id", {preHandler: [verifyJWT] }, removeProductController);
  app.patch("/product/:id" , {preHandler: [verifyJWT] }, editProduct);

  app.post("/category", { preHandler: [verifyJWT] }, createCategory);
  app.get("/category", { preHandler: [verifyJWT] }, getAllCategories);
  app.delete("/category/:id", {preHandler: [verifyJWT] }, removeCategory);
  app.patch("/category/:id" , {preHandler: [verifyJWT] }, editCategory);
  

  app.post("/supplier", { preHandler: [verifyJWT] }, createSupplier);
  app.get("/supplier", {preHandler: [verifyJWT] }, getAllSuppliers);
  app.delete("/supplier/:id", {preHandler: [verifyJWT] }, removeSupplierController);
  app.patch("/supplier/:id" , {preHandler: [verifyJWT] }, editSupplier);

  app.post("/movement", {preHandler: [verifyJWT]}, createMovement)

  
}
