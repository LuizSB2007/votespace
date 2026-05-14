import { z } from "zod";
export declare const roomSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodBoolean;
    ownerId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strict>;
export declare const createRoomSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    ownerId: z.ZodString;
}, z.core.$strict>;
export declare const updateRoomSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export type CreateRoomSchemaType = z.infer<typeof createRoomSchema>;
export type UpdateRoomSchemaType = z.infer<typeof updateRoomSchema>;
export type RoomSchemaType = z.infer<typeof roomSchema>;
//# sourceMappingURL=romm.schema.d.ts.map