import { Request, Response } from 'express';
import roomServices from '../services/roomServices.js';
import { CreateRoomSchema, UpdateRoomSchema } from '../schema/romm.schema.js';

class roomController {
    async getAllRooms(req: Request, res: Response) {
        const rooms = await roomServices.findAllRooms();
        res.json(rooms);
    }

    async getRoomByName(req: Request, res: Response) {
        const { name } = req.params;
        const room = await roomServices.findRoomByName(name as string);
        if (!room) throw new Error("Sala não encontrada");
        else res.json(room);
    }

    async createRoom(req: Request, res: Response) {
        const ownerId: string = req.body.ownerId;
        const data = CreateRoomSchema.parse(req.body);
        const newRoom = await roomServices.createRoom(ownerId, data);
        res.status(200).json(newRoom);
    }

    async updateRoom(req: Request, res: Response) {
        const userPassword: string = req.body.user_password;
        const roomId: string = req.params.roomId as string;
        const data = UpdateRoomSchema.parse(req.body);

        const updatedRoom = await roomServices.updateRoom(userPassword, roomId as string, data);

        res.status(200).json(updatedRoom);
    }

    async deleteRoom(req: Request, res: Response) {
        const userPassword: string = req.body.user_password;
        const roomId: string = req.params.roomId as string;

        const deletedRoom = await roomServices.deleteRoom(userPassword, roomId as string);

        res.status(200).json(deletedRoom);
    }
}

export default new roomController();