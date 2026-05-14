import { Request, Response } from "express";
import authServices from "../services/authServices";
import { LoginSchema } from "../schema/auth.schema";

class AuthController {
    //loga um usuário
    async login(req: Request, res: Response) {
        const data = LoginSchema.parse(req.body)
        const result = await authServices.authenticateUser(data);

        res.json(result);
    }
}

export default new AuthController();