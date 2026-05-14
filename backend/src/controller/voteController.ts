import { Request, Response } from "express";
import VoteService from "../services/voteServices.js";
import { createVoteSchema } from "../schema/vote.schema.js";

//No momemento é possivel solicitar a criaçao de um voto com um id diferente do usuário que solicitou, é necessario criar uma autenticaçao para isso
class VoteController {

    // Pega todos os votos de uma sala
    async getVotesByRoomId(req: Request, res: Response) {
        const roomId = req.params.id as string;
        const votes = await VoteService.findVotesByRoomId(roomId);

        res.status(200).json(votes);
    }

    //Pega todos os votos de uma opção
    async getVotesByOptionId(req: Request, res: Response) {
        const optionId = req.params.id as string;
        const votes = await VoteService.findVotesByOptionId(optionId);

        res.status(200).json(votes);
    }

    // Cria um novo voto    
    async create(req: Request, res: Response) {
        const data = createVoteSchema.parse(req.body);
        const newVote = await VoteService.createVote({ ...data });

        res.status(201).json(newVote);
    }

    // Deleta um voto   
    async delete(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const deletedVote = await VoteService.deleteVote(id);

        res.status(200).json(deletedVote);
    }
}

export default new VoteController();