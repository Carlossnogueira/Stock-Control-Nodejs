import { compare, hash } from 'bcryptjs'

export async function generateHash(password : string): Promise<string> {
    const hashPassword = hash(password,6)
    return hashPassword
}

export async function compareHashPassword(password : string, hash : string): Promise<boolean> {
    return compare(password,hash)
}