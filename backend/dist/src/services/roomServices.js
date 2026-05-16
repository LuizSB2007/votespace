import prisma from "../utils/prisma.js";
import { generateUniqueSlug } from "../utils/slug.js";
class RoomServices {
    //Pesquisa todas as salas
    async findAllRooms() {
        const rooms = await prisma.rooms.findMany();
        return rooms;
    }
    //Encontra uma sala por seu ID
    async findRoomById(id) {
        const room = await prisma.rooms.findUnique({ where: { id }, });
        return room;
    }
    //Encontra uma sala pelo seu slug (nome sem acento e separado por '-')
    async findRoomByslug(slug) {
        const room = await prisma.rooms.findMany({ where: { slug } });
        return room;
    }
    //Cria uma sala
    async createRoom(ownerId, data) {
        const slug = await generateUniqueSlug(data.name); //Tranforma o nome em slug
        const room = await prisma.rooms.create({ data: { ...data, slug, ownerId } });
        return room;
    }
    //Atualiza uma sala, só será possível se o usuário for o criador dela
    async updateRoom(roomId, data) {
        const room = await prisma.rooms.findUnique({ where: { id: roomId } });
        if (!room)
            throw new Error("Sala não encontrada");
        const slug = data.name ? await generateUniqueSlug(data.name) : room.slug; //verifica se o nome foi alterado, caso sim gera um novo slug
        const updatedRoom = await prisma.rooms.update({
            where: { id: roomId },
            data: { ...data, slug, updatedAt: new Date() }
        });
        return updatedRoom;
    }
    //Exclui uma sala e todos os relacionados a ela (opções e votos)
    async deleteRoom(roomId) {
        const room = await prisma.rooms.findUnique({ where: { id: roomId } });
        if (!room)
            throw new Error("Sala não encontrada");
        await prisma.rooms.delete({ where: { id: room.id } });
        return "Sala excluída";
    }
}
export default new RoomServices();
//# sourceMappingURL=roomServices.js.map