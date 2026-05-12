import { z } from "zod";

export const CreateRoomSchema = z.object({
    name: z.string().min(5, "O nome da sala deve conter pelo menos 5 caracteres"),
    description: z.string().min(10, "A descrição da sala deve conter pelo menos 10 caracteres").optional(),
    isPublic: z.boolean().default(true),
    ownerId: z.string()
}).strict();

export const UpdateRoomSchema = z.object({
    name: z.string().min(5, "O nome da sala deve conter pelo menos 5 caracteres").optional(),
    description: z.string().min(10, "A descrição da sala deve conter pelo menos 10 caracteres").optional(),
    isPublic: z.boolean().optional(),
    user_password: z.string()
}).strict();

export type CreateRoomSchemaType = z.infer<typeof CreateRoomSchema>;
export type UpdateRoomSchemaType = z.infer<typeof UpdateRoomSchema>;