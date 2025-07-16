import { prisma } from "../../lib/prisma";
import { PrismaUsersRepository } from "../../repositories/userRepository";
import { generateHash } from "../../utils/hash";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUserUseCase({
  name,
  password,
  email,
}: RegisterUseCaseRequest) {
  const passwordHash = await generateHash(password);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already exists.");
  }

  const userRepository = new PrismaUsersRepository();

  await userRepository.create({
    name,
    password_hash: passwordHash,
    email,
  });
}
