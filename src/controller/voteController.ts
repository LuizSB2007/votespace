import { Request, Response } from "express";
import { randomUUID } from "crypto";
import VoteService from "../services/voteServices.js";
import { createVoteSchema } from "../schema/vote.schema.js";

class VoteController {

    // Pega todos os votos de uma opção
    async getAll(req: Request, res: Response) {
        const optionId = req.body.option_id as string;
        const votes = await VoteService.findAllVotes(optionId);
        res.json(votes);
    }

    // Pega todos os votos de uma sala
    async getVotesByRoomId(req: Request, res: Response) {
        const roomId = req.params.roomId as string;
        const votes = await VoteService.findVotesByRoomId(roomId);
        res.json(votes);
    }

    //Pega todos os votos de uma opção
    async getVotesByOptionId(req: Request, res: Response) {
        const optionId = req.params.optionId as string;
        const votes = await VoteService.findAllVotes(optionId);
        res.json(votes);
    }

    // Cria um novo voto    
    async create(req: Request, res: Response) {
        const data = createVoteSchema.parse(req.body);
        const newVote = await VoteService.createVote({
            ...data,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json(newVote);
    }

    // Deleta um voto   
    async delete(req: Request, res: Response) {
        const id: string = req.params.id as string;
        const deletedVote = await VoteService.deleteVote(id);
        res.status(200).json(deletedVote);
    }
}

export default new VoteController();