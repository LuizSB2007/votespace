import bcrypt from "bcrypt";
import "dotenv/config";

export const hashPassword = async (password: string): Promise<string> => {
    const salt: number = process.env.SALT ? parseInt(process.env.SALT) : 10;
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}