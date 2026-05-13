import { Request, Response } from 'express';
import usersServices from '../services/usersServices.js';
import { createUserSchema, updateUserSchema } from '../schema/user.schema.js';

class UserController {

    // Pega todos os usuários
    async getAll(req: Request, res: Response) {
        const users = await usersServices.findAllUsers();
        res.json(users);
    }

    // Pega um usuário específico por ID
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await usersServices.findUserById(id as string);
        if (!user) throw new Error("Usuário não encontrado");
        else res.json(user);
    }

    // Cria um novo usuário
    async create(req: Request, res: Response) {
        const data = createUserSchema.parse(req.body);
        const newUser = await usersServices.createUser(data);
        res.status(201).json(newUser);
    }

    // Atualiza os dados de um usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = updateUserSchema.parse(req.body);
        const updatedUser = await usersServices.updateUser(id as string, data);
        if (!updatedUser) throw new Error("Senha incorreta");
        else res.status(200).json(updatedUser);
    }

    // Deleta um usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { password } = req.body;
        const deletedUser = await usersServices.deleteUser(id as string, password);
        if (!deletedUser) throw new Error("Senha incorreta");
        else res.status(204).json(deletedUser);
    }
}

export default new UserController();