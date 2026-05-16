import prisma from "../utils/prisma.js";
import { CreateVoteSchemaType } from "../schema/vote.schema";

class VoteServices {

    //Pega todos os votos de uma sala
    async findVotesByRoomId(roomId: string) {
        const votes = await prisma.vote.findMany({ where: { roomId } });
        return votes;
    }

    // Pega todos os votos de uma opção
    async findVotesByOptionId(optionId: string) {
        const votes = await prisma.vote.findMany({ where: { optionId } });
        return votes;
    }

    // Cria um novo voto
    async createVote(data: CreateVoteSchemaType) {
        const vote = await prisma.vote.create({ data: { ...data } });
        return vote;
    }

    // Deleta um voto
    async deleteVote(id: string) {
        await prisma.vote.delete({ where: { id } });
        return "Voto excluído com sucesso";
    }
}

export default new VoteServices();