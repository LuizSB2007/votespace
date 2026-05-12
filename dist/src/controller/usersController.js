import usersServices from '../services/usersServices.js';
import { CreateUserSchema, UpdateUserSchema } from '../schema/user.schema.js';
import { ZodError } from 'zod';
class UserController {
    async getAllUsers(req, res) {
        const users = await usersServices.findAllUsers();
        res.json(users);
    }
    async getUserById(req, res) {
        const { id } = req.params;
        const user = await usersServices.findUserById(id);
        res.json(user);
    }
    async createUser(req, res) {
        try {
            const data = CreateUserSchema.parse(req.body);
            const newUser = await usersServices.createUser(data);
            res.status(200).json(newUser);
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ error: error.issues });
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const data = UpdateUserSchema.parse(req.body);
            const updatedUser = await usersServices.updateUser(id, data);
            if (!updatedUser)
                return res.status(400).json({ error: "Senha incorreta" });
            res.status(201).json(updatedUser);
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ error: error.issues });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const { password } = req.body;
            const deletedUser = await usersServices.deleteUser(id, password);
            if (!deletedUser)
                return res.status(400).json({ error: "Senha incorreta" });
            res.status(200).json(deletedUser);
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ error: error.issues });
        }
    }
}
export default new UserController();
//# sourceMappingURL=usersController.js.map