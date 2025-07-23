import { SupplierRepository } from "../../repositories/supplierRepository";

export async function getAllSuppliers() {
  const supplierRepository = new SupplierRepository();
  return await supplierRepository.getAll();
}
