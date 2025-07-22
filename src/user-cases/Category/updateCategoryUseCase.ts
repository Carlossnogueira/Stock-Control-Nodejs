import { CategoryRepository } from "../../repositories/categoryRepository";


export async function updateCategory(id: number, data: string) {
  const categoryRepository = new CategoryRepository();

  const category = await categoryRepository.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  categoryRepository.update(id, { name : data});
}
