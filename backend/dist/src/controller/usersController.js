import usersServices from '../services/usersServices.js';
import { createUserSchema, updateUserSchema } from '../schema/user.schema.js';
class UserController {
    // Pega todos os usuários
    async getAll(req, res) {
        const users = await usersServices.findAllUsers();
        res.status(200).json(users);
    }
    //Pega o usuário que está logado e devolve ao front
    async getUser(req, res) {
        const user = req.user;
        res.json({
            id: user.userId,
            email: user.email,
            role: user.role,
        });
    }
    // Pega um usuário específico por ID
    async getById(req, res) {
        const { id } = req.params;
        const user = await usersServices.findUserById(id);
        if (!user)
            throw new Error("Usuário não encontrado");
        res.status(200).json(user);
    }
    // Cria um novo usuário
    async create(req, res) {
        const data = createUserSchema.parse(req.body);
        const newUser = await usersServices.createUser(data);
        res.status(201).json(newUser);
    }
    // Atualiza os dados de um usuário
    async update(req, res) {
        const { id } = req.params;
        const data = updateUserSchema.parse(req.body);
        const updatedUser = await usersServices.updateUser(id, data);
        if (!updatedUser)
            throw new Error("Senha incorreta");
        res.status(200).json(updatedUser);
    }
    // Deleta um usuário
    async delete(req, res) {
        const { id } = req.params;
        const { password } = req.body;
        const deletedUser = await usersServices.deleteUser(id, password);
        if (!deletedUser)
            throw new Error("Senha incorreta");
        res.status(200).json(deletedUser);
    }
}
export default new UserController();
//# sourceMappingURL=usersController.js.map