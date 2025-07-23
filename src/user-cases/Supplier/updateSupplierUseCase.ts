import { SupplierRepository } from "../../repositories/supplierRepository";

export async function updateSupplier(
  id: number,
  name: string,
  phone: string,
  email: string
) {
  const supplierRepository = new SupplierRepository();

  const supplier = await supplierRepository.findById(id);
  if (!supplier) {
    throw new Error("Supplier not found");
  }

  await supplierRepository.update(id, { name, phone, email });
}