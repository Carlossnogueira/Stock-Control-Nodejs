import { CategoryRepository } from "../../repositories/categoryRepository";
import { ProductRepository } from "../../repositories/productRepository";

export async function removeCategory(id: number) {
  const categoryRepository = new CategoryRepository();
  const productRepository = new ProductRepository();

  const findCategory = await categoryRepository.findById(id);

  if (!findCategory) {
    throw new Error("Category not found");
  }

  try {
    const category = await categoryRepository.remove(id);
    return category;
  } catch (e) {
    return null;
  }
}
