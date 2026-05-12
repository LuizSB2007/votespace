import { Request, Response } from 'express';
import usersServices from '../services/usersServices.js';
import { CreateUserSchema, UpdateUserSchema } from '../schema/user.schema.js';

class UserController {
    async getAllUsers(req: Request, res: Response) {
        const users = await usersServices.findAllUsers();
        res.json(users);
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await usersServices.findUserById(id as string);
        if(!user) throw new Error("Usuário não encontrado");
        else res.json(user);
    }

    async createUser(req: Request, res: Response) {
        const data = CreateUserSchema.parse(req.body);
        const newUser = await usersServices.createUser(data);
        res.status(201).json(newUser);
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const data = UpdateUserSchema.parse(req.body);
        const updatedUser = await usersServices.updateUser(id as string, data);
        if (!updatedUser) throw new Error("Senha incorreta");
        else res.status(200).json(updatedUser);
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const { password } = req.body;
        const deletedUser = await usersServices.deleteUser(id as string, password);
        if (!deletedUser) throw new Error("Senha incorreta");
        else res.status(204).json(deletedUser);
    }
}

export default new UserController();