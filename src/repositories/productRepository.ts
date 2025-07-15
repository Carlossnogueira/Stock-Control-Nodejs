import { prisma } from '../lib/prisma'
import { Prisma } from '../../generated/prisma'

export class ProductRepository{

    async create(data : Prisma.ProductCreateInput){
        const produt = await prisma.product.create({
            data,
        })

        return true
    }


}