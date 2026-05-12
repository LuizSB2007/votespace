import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        ADMIN: "ADMIN";
        USER: "USER";
    }>>;
}, z.core.$strict>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    newPassword: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=user.schema.d.ts.map