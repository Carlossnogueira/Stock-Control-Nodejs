import { prisma } from '../lib/prisma'
import { Prisma } from '../../generated/prisma'

interface userLogin{
  email : string
}

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async checkIfUserExists(email : string)  {
    
    const user = await prisma.user.findFirst({
      where:{
        email: email,
      }
    })

    return user
  }

}
