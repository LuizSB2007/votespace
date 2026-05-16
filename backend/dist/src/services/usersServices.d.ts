import { CreateUserSchemaType, UpdateUserSchemaType } from "../schema/user.schema.js";
declare class UsersService {
    findAllUsers(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        passwordHash: string;
        lastLoginAt: Date | null;
    }[]>;
    findUserById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        passwordHash: string;
        lastLoginAt: Date | null;
    } | null>;
    findUserByEmail(email: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        passwordHash: string;
        lastLoginAt: Date | null;
    } | null>;
    createUser(data: CreateUserSchemaType): Promise<{
        token: {
            token: string;
        };
        user: {
            id: string;
            name: string;
        };
    }>;
    updateUser(id: string, data: UpdateUserSchemaType): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        passwordHash: string;
        lastLoginAt: Date | null;
    } | "Senha incorreta">;
    deleteUser(id: string, password: string): Promise<"Senha incorreta" | "Usuario excluido">;
}
declare const _default: UsersService;
export default _default;
//# sourceMappingURL=usersServices.d.ts.map