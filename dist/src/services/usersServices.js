import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";
class UsersService {
    //Busca todos os usuários
    async findAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
    //Busca um usuário por ID
    async findUserById(id) {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user;
    }
    //Cria um novo usuário
    async createUser(data) {
        const passwordHash = bcrypt.hashSync(data.password, 12); //Encripta a senha do usuário
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: passwordHash,
                role: data.role,
            },
        });
        return { "Novo usuario criado": user };
    }
    //Atualiza um usuário existente, verificando a senha atual antes de permitir a atualização
    async updateUser(id, data) {
        const usuarioId = await prisma.user.findUnique({ where: { id: id } });
        if (bcrypt.compareSync(data.password, usuarioId?.passwordHash || '')) {
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name || usuarioId?.name,
                    email: data.email || usuarioId?.email,
                    passwordHash: data.newPassword ? bcrypt.hashSync(data.newPassword, 12) : usuarioId?.passwordHash,
                },
            });
            return { "Usuario atualizado": updatedUser };
        }
        return null;
    }
    async deleteUser(id, password) {
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (bcrypt.compareSync(password, user?.passwordHash || '')) {
            await prisma.user.delete({ where: { id: id } });
            return { "Usuario excluido": user?.name };
        }
        return null;
    }
}
export default new UsersService();
//# sourceMappingURL=usersServices.js.map