import prisma from "../utils/prisma.js";
class VoteServices {
    //Pega todos os votos de uma sala
    async findVotesByRoomId(roomId) {
        const votes = await prisma.vote.findMany({ where: { roomId } });
        return votes;
    }
    // Pega todos os votos de uma opção
    async findVotesByOptionId(optionId) {
        const votes = await prisma.vote.findMany({ where: { optionId } });
        return votes;
    }
    // Cria um novo voto
    async createVote(data) {
        const vote = await prisma.vote.create({ data: { ...data } });
        return vote;
    }
    // Deleta um voto
    async deleteVote(id) {
        await prisma.vote.delete({ where: { id } });
        return "Voto excluído com sucesso";
    }
}
export default new VoteServices();
//# sourceMappingURL=voteServices.js.map