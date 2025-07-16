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
}
