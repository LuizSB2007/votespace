import bcrypt from "bcrypt";
import "dotenv/config";

//Transforma uma senha normal em hash para ser encriptada
export const hashPassword = async (password: string): Promise<string> => {
    const salt: number = process.env.SALT ? parseInt(process.env.SALT) : 10;
    return await bcrypt.hash(password, salt);
}

//Compara uma enha normal com uma hash, caso for igual retorna verdadeiro
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}