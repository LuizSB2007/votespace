import prisma from "../utils/prisma.js";

import { CreateUserSchemaType, UpdateUserSchemaType } from "../schema/user.schema.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import authServices from "./authServices.js";

class UsersService {

    //Busca todos os usuários
    async findAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    //Busca um usuário por ID
    async findUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user;
    }

    //Busca um usuário por email
    async findUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    //Cria um novo usuário
    async createUser(data: CreateUserSchemaType) {
        if (await this.findUserByEmail(data.email)) throw new Error("Esse email já está cadastrado")

        const passwordHash = await hashPassword(data.password); //Encripta a senha do usuário

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: passwordHash,
                role: data.role,
            },
        });

        const token = await authServices.authenticateUser({ email: data.email, password: data.password })
        return { "Ususario criado com sucesso, token de autenticação: ": token };
    }

    //Atualiza um usuário existente, verificando a senha atual antes de permitir a atualização
    async updateUser(id: string, data: UpdateUserSchemaType) {
        const usuarioId = await prisma.user.findUnique({ where: { id: id } });
        if (await comparePassword(data.password, usuarioId?.passwordHash || '')) {
            await prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name || usuarioId?.name,
                    email: data.email || usuarioId?.email,
                    passwordHash: data.newPassword ? await hashPassword(data.newPassword) : usuarioId?.passwordHash,
                    updatedAt: new Date()
                },
            });
            return "Usuario atualizado";
        }
        return null;
    }

    //Exclui um usuário, verificando a senha antes de permitir a exclusão
    async deleteUser(id: string, password: string) {
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (await comparePassword(password, user?.passwordHash || '')) {
            await prisma.user.delete({ where: { id: id } });
            return "Usuario excluido";
        }
        return null;
    }
}

export default new UsersService();
