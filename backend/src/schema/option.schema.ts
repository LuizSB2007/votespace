import { z } from "zod";
import { roomSchema } from "./romm.schema.js";

export const optionSchema = z.object({
    id: z.string(),
    text: z.string(),
    roomId: roomSchema.shape.id,
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const createOptionSchema = z.object({
    text: z.string().min(1, "O texto da opção deve conter pelo menos 1 caractere"),
    roomId: roomSchema.shape.id,
}).strict();

export const updateOptionSchema = z.object({
    text: z.string().min(1, "O texto da opção deve conter pelo menos 1 caractere"),
}).strict();

export type CreateOptionSchemaType = z.infer<typeof createOptionSchema>;
export type UpdateOptionSchemaType = z.infer<typeof updateOptionSchema>;
export type OptionSchemaType = z.infer<typeof optionSchema>;