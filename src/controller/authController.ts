import { Request, Response } from "express";
import authServices from "../services/authServices";
import { LoginSchema } from "../schema/auth.schema";

class AuthController {
    async login(req: Request, res: Response) {
        const data = LoginSchema.parse(req.body)
        const result = await authServices.authenticateUser(data);
        return res.json(result);
    }
}

export default AuthController