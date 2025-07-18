import { CategoryRepository } from "../../repositories/categoryRepository";

export async function getAllCategories() {
  const categoryRepository = new CategoryRepository();

  const allCategories = await categoryRepository.getAll();

  return allCategories;
}
