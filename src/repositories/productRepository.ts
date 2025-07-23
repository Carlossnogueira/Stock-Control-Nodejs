import { prisma } from "../lib/prisma";
import { Prisma } from "../../generated/prisma";

export class ProductRepository {
  async create(data: Prisma.ProductCreateInput) {
    const produt = await prisma.product.create({
      data,
    });

    return true;
  }

  async findByName(name: string) {
    const product = await prisma.product.findFirst({ where: { name: name } });
    return product;
  }

  async findSku(sku: string) {
    const product = await prisma.product.findUnique({ where: { sku: sku } });
    return product;
  }

  async findById(id: number) {
    return await prisma.product.findFirst({ where: { id } });
  }

  async getAll() {
    return await prisma.product.findMany({
      include: {
        category: true,
        supplierId: true,
      },
    });
  }

  async remove(id: number) {
    return await prisma.product.delete({ where: { id } });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({ where: { id }, data });
  }

}
