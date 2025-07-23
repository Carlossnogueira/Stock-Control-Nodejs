import { ProductRepository } from "../../repositories/productRepository";

export async function removeProduct(id: number) {
  const productRepository = new ProductRepository();

  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  try {
    return await productRepository.remove(id);
  } catch (e) {
    return null;
  }
}
