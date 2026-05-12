import {z} from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
}).strict();

export const UpdateUserSchema = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres").optional(),
    email: z.string().email("Formato de email inválido").optional(),
    password: z.string(),
    newPassword: z.string().min(4, "A nova senha deve conter pelo menos 4 caracteres").optional(),
}).strict();

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;