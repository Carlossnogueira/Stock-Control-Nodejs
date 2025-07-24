import { prisma } from "../lib/prisma";
import { Prisma } from "../../generated/prisma";

export class MovementRepository {
  async create(data: Prisma.MovementCreateInput) {
    const movement = await prisma.movement.create({ data });
    return movement;
  }

  async findById(id: number) {
    const category = await prisma.movement.findFirst({ where: { id: id } });
    return category;
  }

  async getAll() {
    const categorys = await prisma.movement.findMany();
    return categorys;
  }

  async remove(id: number) {
    const remove = await prisma.movement.delete({ where: { id: id } });
    return remove;
  }

  async update(id: number, data: Prisma.MovementCreateInput) {
    const category = await prisma.movement.update({ where: { id: id }, data });
    return category;
  }
}
