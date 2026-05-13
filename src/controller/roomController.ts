import { Request, Response } from 'express';
import roomServices from '../services/roomServices.js';
import { createRoomSchema, updateRoomSchema } from '../schema/romm.schema.js';

class roomController {

    // Pega todas as salas
    async getAll(req: Request, res: Response) {
        const rooms = await roomServices.findAllRooms();
        res.json(rooms);
    }

    // Pega uma sala específica por ID
    async getByName(req: Request, res: Response) {
        const name: string = req.params.name as string;
        const room = await roomServices.findRoomByName(name as string);
        if (!room) throw new Error("Sala não encontrada");
        else res.json(room);
    }

    // Cria uma nova sala
    async create(req: Request, res: Response) {
        const ownerId: string = req.body.ownerId;
        const data = createRoomSchema.parse(req.body);
        const newRoom = await roomServices.createRoom(ownerId, data);
        res.status(200).json(newRoom);
    }

    // Atualiza os dados de uma sala
    async update(req: Request, res: Response) {
        const userPassword: string = req.body.user_password;
        const roomId: string = req.params.id as string;
        delete req.body.user_password; // Remove a senha do corpo da requisição para não ser passada para o serviço de atualização
        const data = updateRoomSchema.parse(req.body);

        const updatedRoom = await roomServices.updateRoom(userPassword, roomId as string, data);

        res.status(200).json(updatedRoom);
    }

    // Deleta uma sala
    async delete(req: Request, res: Response) {
        const userPassword: string = req.body.user_password;
        const roomId: string = req.params.id as string;

        const deletedRoom = await roomServices.deleteRoom(userPassword, roomId as string);

        res.status(200).json(deletedRoom);
    }
}

export default new roomController();