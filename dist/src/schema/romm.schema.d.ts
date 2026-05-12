import { z } from "zod";
export declare const CreateRoomSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
}, z.core.$strict>;
export type CreateRoomSchemaType = z.infer<typeof CreateRoomSchema>;
//# sourceMappingURL=romm.schema.d.ts.map