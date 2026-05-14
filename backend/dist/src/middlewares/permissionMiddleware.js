import roomServices from "../services/roomServices";
//Função responsável por verificar se o usuário tem permisão para alterar os dados de uma sala
export async function permissionEditMiddleware(req, res, next) {
    const roomId = req.params.id;
    const userId = req.user.userId;
    const role = req.user.role;
    const room = await roomServices.findRoomById(roomId);
    if (!room)
        throw new Error("Sala não encontrada");
    if (room.ownerId !== userId && role !== "ADMIN")
        throw new Error("Acesso negado, você não tem permissão de editar");
    return next();
}
//# sourceMappingURL=permissionMiddleware.js.map