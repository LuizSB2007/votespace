import { z } from "zod";
import { roomSchema } from "./romm.schema.js";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    role: z.enum(['ADMIN', 'USER']),
    createdAt: z.date(),
    updatedAt: z.date(),
    lastLogin: z.date().optional(),

    rooms: roomSchema.array().optional(),
    //votes: voteSchema.array().optional(),
}).strict();

export const createUserSchema = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
}).strict();

export const updateUserSchema = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres").optional(),
    email: z.string().email("Formato de email inválido").optional(),
    password: z.string(),
    newPassword: z.string().min(4, "A nova senha deve conter pelo menos 4 caracteres").optional(),
}).strict();

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
export type UserSchemaType = z.infer<typeof userSchema>;