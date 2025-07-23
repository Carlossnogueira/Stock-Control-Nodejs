import { ProductRepository } from "../../repositories/productRepository";

export async function updateProduct(
  id: number,
  data: {
    name: string;
    sku?: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    price_cost: number;
    price_sale: number;
    category_id: number;
    supplier_id?: number;
  }
) {
  const productRepository = new ProductRepository();

  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await productRepository.update(id, {
    name: data.name,
    sku: data.sku,
    quantity: data.quantity,
    min_quantity: data.min_quantity,
    max_quantity: data.max_quantity,
    price_cost: data.price_cost,
    price_sale: data.price_sale,
    category: { connect: { id: data.category_id } },
    supplierId: data.supplier_id
      ? { connect: { id: data.supplier_id } }
      : { disconnect: true },
  });
}
