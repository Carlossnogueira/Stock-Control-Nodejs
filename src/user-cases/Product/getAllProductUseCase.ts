import { ProductRepository } from "../../repositories/productRepository";

export async function getAllProducts() {
  const productRepository = new ProductRepository();
  return await productRepository.getAll();
}
