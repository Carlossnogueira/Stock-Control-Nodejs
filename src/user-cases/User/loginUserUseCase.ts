import { compare } from "bcryptjs";
import { PrismaUsersRepository } from "../../repositories/userRepository";
import { compareHashPassword, generateHash } from "../../utils/hash";

interface LoginUserRequest {
    password: string,
    email: string,
}

export async function loginUserUseCase({ password, email }: LoginUserRequest) {

    const userRepository = new PrismaUsersRepository()

    const user = await userRepository.checkIfUserExists(email)


    if (user) {
        const compareHash = await compareHashPassword(password, user.password_hash)

        if (compareHash === false) {
            throw new Error('Email or password are incorrect.')
        }

        return user

    } else {
        throw new Error('Internal Error.')
    }

}