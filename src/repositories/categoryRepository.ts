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

  async getAll(){
    const categorys = await prisma.category.findMany()
    return categorys;
  }

  async remove(id: number){
    const remove = await prisma.category.delete({where: {id: id}})
    return remove
  }

  async update(id: number, data: Prisma.CategoryCreateInput){
    const category = await prisma.category.update({where: {id:id}, data})
    return category
  }

}
