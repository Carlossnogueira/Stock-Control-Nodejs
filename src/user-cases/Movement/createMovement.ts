import { MovementRepository } from "../../repositories/movementRepository";
import { ProductRepository } from "../../repositories/productRepository";
import { PrismaUsersRepository } from "../../repositories/userRepository";

interface Movement {
  product_id: number;
  user_id: number;
  type: string;
  quantity: number;
  description: string;
}

export async function createNewMovement(movement: Movement) {
  console.log(movement);

  const userRepository = new PrismaUsersRepository();
  const productRepository = new ProductRepository();
  const movementRepository = new MovementRepository();

  const product = await productRepository.findById(movement.product_id);

  let quantity = movement.quantity;

  let quantityPlusProduct = quantity;

  if (product) {
    quantityPlusProduct = product.quantity + quantity;
  }

  if (!product) {
    return { error: "Product not found" };
  }

  if (
    movement.type === "ENTRY" &&
    product.quantity + movement.quantity > product.max_quantity
  ) {
    return { error: "Exceeds maximum quantity" };
  }

  if (movement.type === "EXIT") {
    if (movement.quantity > product.quantity) {
      return { error: "Quantity is greater than the product quantity" };
    }

    quantity = product.quantity - movement.quantity;
    console.log("->" + quantity);

    await productRepository.update(product.id, {
      quantity: quantity,
    });

    await movementRepository.create({
      productId: { connect: { id: movement.product_id } },
      type: movement.type,
      quantity: movement.quantity,
      description: movement.description,
      userId: { connect: { id: movement.user_id } },
    });

    return { message: "Movement created successfully" };
  }

  await productRepository.update(product.id, {
    quantity: quantityPlusProduct,
  });

  await movementRepository.create({
    productId: { connect: { id: movement.product_id } },
    type: movement.type,
    quantity: movement.quantity,
    description: movement.description,
    userId: { connect: { id: movement.user_id } },
  });

  return { message: "Movement created successfully" };
}
