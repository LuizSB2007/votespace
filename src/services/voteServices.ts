import prisma from "../utils/prisma.js";
import { VoteSchemaType } from "../schema/vote.schema";

class VoteServices {

    //Pega todos os votos de uma sala
    async findVotesByRoomId(roomId: string) {
        const votes = await prisma.vote.findMany({ where: { roomId } });
        return votes;
    }

    // Pega todos os votos de uma opção
    async findAllVotes(optionId: string) {
        const votes = await prisma.vote.findMany({ where: { optionId } });
        return votes;
    }

    // Cria um novo voto
    async createVote(data: VoteSchemaType) {
        await prisma.vote.create({ data: { ...data } });
        return "Voto criado com sucesso";
    }

    // Deleta um voto
    async deleteVote(id: string) {
        await prisma.vote.delete({ where: { id } });
        return "Voto excluído com sucesso";
    }
}

export default new VoteServices();