import { CreateVoteSchemaType } from "../schema/vote.schema";
declare class VoteServices {
    findVotesByRoomId(roomId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roomId: string;
        optionId: string;
    }[]>;
    findVotesByOptionId(optionId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roomId: string;
        optionId: string;
    }[]>;
    createVote(data: CreateVoteSchemaType): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roomId: string;
        optionId: string;
    }>;
    deleteVote(id: string): Promise<string>;
}
declare const _default: VoteServices;
export default _default;
//# sourceMappingURL=voteServices.d.ts.map