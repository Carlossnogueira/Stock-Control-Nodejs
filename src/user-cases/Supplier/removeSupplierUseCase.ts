import { SupplierRepository } from "../../repositories/supplierRepository";

export async function removeSupplier(id: number) {
  const supplierRepository = new SupplierRepository();

  const supplier = await supplierRepository.findById(id);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  try {
    const deleted = await supplierRepository.remove(id);
    return deleted;
  } catch (e) {
    return null;
  }
}
