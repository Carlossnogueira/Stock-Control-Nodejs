import { prisma } from "../lib/prisma";
import { Prisma } from "../../generated/prisma";

export class CategoryRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return true;
  }

  async findById(id: number) {
    const category = await prisma.category.findFirst({ where: { id: id } });
    return category;
  }

  async findByName(name: string) {
    const category = await prisma.category.findFirst({ where: { name: name } });
    return category;
  }
}
