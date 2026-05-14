import roomServices from '../services/roomServices.js';
import { createRoomSchema, updateRoomSchema } from '../schema/romm.schema.js';
class RoomController {
    // Pega todas as salas
    async getAll(req, res) {
        const rooms = await roomServices.findAllRooms();
        res.status(200).json(rooms);
    }
    // Pega uma sala específica por ID
    async getById(req, res) {
        const id = req.params.id;
        const rooms = await roomServices.findRoomById(id);
        res.status(200).json(rooms);
    }
    // Pega uma sala específica pelo slug
    async getBySlug(req, res) {
        const slug = req.params.slug;
        const room = await roomServices.findRoomByslug(slug);
        if (!room)
            throw new Error("Sala não encontrada");
        return res.status(200).json(room);
    }
    // Cria uma nova sala
    async create(req, res) {
        const ownerId = req.body.ownerId;
        const data = createRoomSchema.parse(req.body);
        const newRoom = await roomServices.createRoom(ownerId, data);
        res.status(201).json(newRoom);
    }
    // Atualiza os dados de uma sala
    async update(req, res) {
        const userPassword = req.body.user_password;
        const roomId = req.params.id;
        delete req.body.user_password; // Remove a senha do corpo da requisição para não ser passada para o serviço de atualização
        const data = updateRoomSchema.parse(req.body);
        const updatedRoom = await roomServices.updateRoom(roomId, data);
        res.status(200).json(updatedRoom);
    }
    // Deleta uma sala e seus relacionados (opções e votos)
    async delete(req, res) {
        const roomId = req.params.id;
        const deletedRoom = await roomServices.deleteRoom(roomId);
        res.status(200).json(deletedRoom);
    }
}
export default new RoomController();
//# sourceMappingURL=roomController.js.map