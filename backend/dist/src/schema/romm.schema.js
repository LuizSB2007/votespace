import { z } from "zod";
export const roomSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    isPublic: z.boolean(),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();
export const createRoomSchema = z.object({
    name: z.string().min(5, "O nome da sala deve conter pelo menos 5 caracteres"),
    description: z.string().min(10, "A descrição da sala deve conter pelo menos 10 caracteres").optional(),
    isPublic: z.boolean().default(true),
    ownerId: z.string()
}).strict();
export const updateRoomSchema = z.object({
    name: z.string().min(5, "O nome da sala deve conter pelo menos 5 caracteres").optional(),
    description: z.string().min(10, "A descrição da sala deve conter pelo menos 10 caracteres").optional(),
    isPublic: z.boolean().optional(),
    //user_password: z.string()
}).strict();
//# sourceMappingURL=romm.schema.js.map