import { ProductRepository } from "../../repositories/productRepository"

interface Product {
    name : string,
    sku? : string,
    quantity : number,
    category: {
        connect: { id: number }
    },
    min_quantity : number,
    max_quantity : number,
    price_cost : number,
    price_sale : number,
    supplier_id? : {
        connect: { id : number }
    }
}

export async function createNewProduct( product : Product  ) {

    const productRepository = new ProductRepository()

    try{

        await productRepository.create(product)

    } catch(e){

        console.log(e)
        throw new Error("Fail to create this Product." )

    }

    return true

}