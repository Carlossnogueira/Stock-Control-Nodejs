import { CategoryRepository } from "../../repositories/categoryRepository";

export async function createNewCategory(category: string) {
  const categoryRepository = new CategoryRepository();

  if (await categoryRepository.findByName(category)) {
    throw new Error("This category just exists");
  }

  categoryRepository.create({ name: category });

  return true;
}
