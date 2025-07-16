import { ProductRepository } from "../../repositories/productRepository";
import { CategoryRepository } from "../../repositories/categoryRepository";

interface Product {
  name: string;
  sku?: string;
  quantity: number;
  category: {
    connect: { id: number };
  };
  min_quantity: number;
  max_quantity: number;
  price_cost: number;
  price_sale: number;
  supplier_id?: {
    connect: { id: number };
  };
}

export async function createNewProduct(product: Product) {
  const productRepository = new ProductRepository();
  const categoryRepository = new CategoryRepository();

  const findCategory = await categoryRepository.find(
    product.category.connect.id
  );

  if (!findCategory) {
    throw new Error("Category not found.");
  }

  const findSameProduct = await productRepository.findByName(product.name);

  if (findSameProduct) {
    const isDuplicate =
      findSameProduct.sku === product.sku &&
      findSameProduct.category_id === product.category.connect.id &&
      findSameProduct.price_cost.toNumber() === product.price_cost &&
      findSameProduct.price_sale.toNumber() === product.price_sale &&
      findSameProduct.min_quantity === product.min_quantity &&
      findSameProduct.max_quantity === product.max_quantity;

    if (isDuplicate) {
      throw new Error("Product already exists with same properties.");
    }
  }

  if (await productRepository.findSku(product.sku || "0")) {
    throw new Error("Product SKU exists with same code.");
  }

  try {
    await productRepository.create(product);
  } catch (e) {
    throw new Error("Fail to create this Product.");
  }

  return true;
}
