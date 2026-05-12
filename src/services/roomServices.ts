import { CreateRoomSchemaType, UpdateRoomSchemaType } from "../schema/romm.schema.js";
import prisma from "../database/prisma.js";
import slugify from 'slugify';
import bcrypt from "bcrypt";
import UserService from "./usersServices.js";

class RoomServices {

    async findAllRooms() {
        const rooms = await prisma.rooms.findMany();
        return rooms;
    }

    async findRoomByName(name: string) {
        const room = await prisma.rooms.findMany({
            where: { slug: name },
        });
        return room;
    }

    async createRoom(ownerId: string, data: CreateRoomSchemaType) {
        const slug = await generateUniqueSlug(data.name);

        await prisma.rooms.create({ data: { ...data, slug, ownerId } });
        return "Sala criada";
    }

    async updateRoom(userPasswoword: string, roomId: string, data: UpdateRoomSchemaType) {
        const room = await prisma.rooms.findUnique({ where: { id: roomId } });
        const ownerUserPassword = (await UserService.findUserById(room?.ownerId as string))?.passwordHash; //Busca a senha do usuário proprietário da sala para comparação

        if (!room) throw new Error("Sala não encontrada");

        const slug = data.name ? await generateUniqueSlug(data.name) : room.slug;

        if (!bcrypt.compareSync(userPasswoword, ownerUserPassword || ''))
            throw new Error("Digite a senha correta para atualizar a sala");

        await prisma.rooms.update({
            where: { id: roomId },
            data: { ...data, slug, updatedAt: new Date() }
        });
        return "Sala atualizada";
    }

    async deleteRoom(userPassword: string, roomId: string) {
        const room = await prisma.rooms.findUnique({ where: { id: roomId } });
        const ownerUserPassword = (await UserService.findUserById(room?.ownerId as string))?.passwordHash; //Busca a senha do usuário proprietário da sala para comparação


        if (!room) throw new Error("Sala não encontrada");

        if (!bcrypt.compareSync(userPassword, ownerUserPassword || ''))
            throw new Error("Digite a senha correta para excluir a sala");

        await prisma.rooms.delete({ where: { id: roomId } });
        return "Sala excluída";
    }
}

async function generateUniqueSlug(name: string): Promise<string> {
    const slug = slugify(name, { lower: true, strict: true });

    const existSlug = await prisma.rooms.findMany({
        where: { slug: slug },
    });

    if (existSlug.length > 0) return slug + '-' + Math.random().toString(36).substring(2, 8);
    return slug;
}

export default new RoomServices();