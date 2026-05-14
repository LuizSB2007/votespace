import { Request, Response, NextFunction } from "express";
import { verifyTokenValid } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

//Função responsável por garantir que apenas usuários logados possuam acesso as rotas privadas
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "O token não foi fornecido" });

    const token = authHeader.split(" ")[1]; //Bear([0]) TOKEN([1])

    if (!token) return res.status(401).json({ message: "O token é inválido" });

    const decoded = verifyTokenValid(token) as JwtPayload; //Verifica a validade do token e coleta os dados encriptografados no mesmo

    (req as any).user = decoded;

    return next();
}