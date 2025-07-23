import { prisma } from "../lib/prisma";
import { Prisma } from "../../generated/prisma";

export class SupplierRepository {
  async create(data: Prisma.SupplierCreateInput) {
    const supplier = await prisma.supplier.create({
      data,
    });

    return true;
  }

  async findById(id: number) {
    const supplier = await prisma.supplier.findFirst({ where: { id: id } });
    return supplier;
  }

  async findByName(name: string) {
    const supplier = await prisma.supplier.findFirst({ where: { name: name } });
    return supplier;
  }

  async getAll(){
    const suppliers = await prisma.supplier.findMany()
    return suppliers;
  }

  async remove(id: number) {
    return await prisma.supplier.delete({ where: { id } });
  }

  async update(id: number, data: Prisma.SupplierUpdateInput) {
    return await prisma.supplier.update({ where: { id }, data });
  }

}
