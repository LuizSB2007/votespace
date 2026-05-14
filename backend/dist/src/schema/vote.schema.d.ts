import { z } from "zod";
export declare const voteSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    roomId: z.ZodString;
    optionId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strict>;
export declare const createVoteSchema: z.ZodObject<{
    userId: z.ZodString;
    roomId: z.ZodString;
    optionId: z.ZodString;
}, z.core.$strict>;
export type CreateVoteSchemaType = z.infer<typeof createVoteSchema>;
export type VoteSchemaType = z.infer<typeof voteSchema>;
//# sourceMappingURL=vote.schema.d.ts.map