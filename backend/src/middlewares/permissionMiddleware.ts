import { NextFunction, Request, Response } from "express"
import roomServices from "../services/roomServices.js"

//Função responsável por verificar se o usuário tem permisão para alterar os dados de uma sala
export async function permissionEditMiddleware(req: Request, res: Response, next: NextFunction) {
    const roomId = req.params.id as string
    const userId = (req as any).user.userId
    const role = (req as any).user.role

    const room = await roomServices.findRoomById(roomId);

    if (!room) throw new Error("Sala não encontrada");

    if (room.ownerId !== userId && role !== "ADMIN") throw new Error("Acesso negado, você não tem permissão de editar");

    return next();
}