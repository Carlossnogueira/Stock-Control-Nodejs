import { prisma } from "../lib/prisma";

console.log('-> LOG: Checking database... ')

export async function testConnection() {
  try {
    const result = await prisma.user.findFirst()
    console.log('-> LOG: Connection with database sucess!');
  } catch (error) {
    console.log('-> LOG: Fail to connect with database, are you offline?')
  } finally {
    await prisma.$disconnect();
  }
}

