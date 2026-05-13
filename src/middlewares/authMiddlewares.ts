import { Request, Response, NextFunction } from "express";
import { verifyTokenValid } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "O token não foi fornecido" })

    const token = authHeader.split(" ")[1]; //Bear TOKEN

    if (!token) return res.status(401).json({ message: "O token é inválido" })
        
    const decoded = verifyTokenValid as JwtPayload

    (req as any).user = decoded

    return next
}