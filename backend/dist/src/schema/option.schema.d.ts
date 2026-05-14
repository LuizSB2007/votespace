import { z } from "zod";
export declare const optionSchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    roomId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strict>;
export declare const createOptionSchema: z.ZodObject<{
    text: z.ZodString;
    roomId: z.ZodString;
}, z.core.$strict>;
export declare const updateOptionSchema: z.ZodObject<{
    text: z.ZodString;
}, z.core.$strict>;
export type CreateOptionSchemaType = z.infer<typeof createOptionSchema>;
export type UpdateOptionSchemaType = z.infer<typeof updateOptionSchema>;
export type OptionSchemaType = z.infer<typeof optionSchema>;
//# sourceMappingURL=option.schema.d.ts.map