import { SupplierRepository } from '../../repositories/supplierRepository'

interface Supplier{
    name: string,
    email:string,
    phone:string
}

export async function createNewSupplier(supplier : Supplier) {

    const supplierRepository = new SupplierRepository()

    const findSameSupplier = await supplierRepository.findByName(supplier.name)

    if(findSameSupplier){
        const isDuplicate = 
            supplier.email === findSameSupplier.email &&
            supplier.phone === findSameSupplier.phone
        
        if(isDuplicate === true){
             throw new Error("Supplier already exists with same properties.");
        }
    }

    try {
        await supplierRepository.create(supplier)
    } catch (error) {
         throw new Error("Fail to create this Supplier.");
    }
   
 
}