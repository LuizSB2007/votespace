import VoteService from "../services/voteServices.js";
import { createVoteSchema } from "../schema/vote.schema.js";
//No momemento é possivel solicitar a criaçao de um voto com um id diferente do usuário que solicitou, é necessario criar uma autenticaçao para isso
class VoteController {
    // Pega todos os votos de uma sala
    async getVotesByRoomId(req, res) {
        const roomId = req.params.id;
        const votes = await VoteService.findVotesByRoomId(roomId);
        res.status(200).json(votes);
    }
    //Pega todos os votos de uma opção
    async getVotesByOptionId(req, res) {
        const optionId = req.params.id;
        const votes = await VoteService.findVotesByOptionId(optionId);
        res.status(200).json(votes);
    }
    // Cria um novo voto    
    async create(req, res) {
        const data = createVoteSchema.parse(req.body);
        const newVote = await VoteService.createVote({ ...data });
        res.status(201).json(newVote);
    }
    // Deleta um voto   
    async delete(req, res) {
        const id = req.params.id;
        const deletedVote = await VoteService.deleteVote(id);
        res.status(200).json(deletedVote);
    }
}
export default new VoteController();
//# sourceMappingURL=voteController.js.map