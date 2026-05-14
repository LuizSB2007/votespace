import { z } from "zod";
export const voteSchema = z.object({
    id: z.string(),
    userId: z.string(),
    roomId: z.string(),
    optionId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();
export const createVoteSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    optionId: z.string(),
}).strict();
//# sourceMappingURL=vote.schema.js.map