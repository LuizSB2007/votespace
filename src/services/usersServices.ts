import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";
import { CreateUserSchemaType, UpdateUserSchemaType } from "../schema/user.schema.js";

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

    //Cria um novo usuário
    async createUser(data: CreateUserSchemaType) {
        const passwordHash = bcrypt.hashSync(data.password, 12); //Encripta a senha do usuário
        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: passwordHash,
                role: data.role,
            },
        });
        return "Usuário criado";
    }

    //Atualiza um usuário existente, verificando a senha atual antes de permitir a atualização
    async updateUser(id: string, data: UpdateUserSchemaType) {
        const usuarioId = await prisma.user.findUnique({ where: { id: id } });
        if (bcrypt.compareSync(data.password, usuarioId?.passwordHash || '')) {
            await prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name || usuarioId?.name,
                    email: data.email || usuarioId?.email,
                    passwordHash: data.newPassword ? bcrypt.hashSync(data.newPassword, 12) : usuarioId?.passwordHash,
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
        if (bcrypt.compareSync(password, user?.passwordHash || '')) {
            await prisma.user.delete({ where: { id: id } });
            return "Usuario excluido";
        }
        return null;
    }
}

export default new UsersService();
