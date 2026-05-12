import { CreateUserSchemaType, UpdateUserSchemaType } from "../schema/user.schema.js";
declare class UsersService {
    findAllUsers(): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        id: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
    }[]>;
    findUserById(id: string): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client/client").$Enums.UserRole;
        id: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
    } | null>;
    createUser(data: CreateUserSchemaType): Promise<{
        "Novo usuario criado": {
            name: string;
            email: string;
            role: import(".prisma/client/client").$Enums.UserRole;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            lastLoginAt: Date | null;
        };
    }>;
    updateUser(id: string, data: UpdateUserSchemaType): Promise<{
        "Usuario atualizado": {
            name: string;
            email: string;
            role: import(".prisma/client/client").$Enums.UserRole;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            lastLoginAt: Date | null;
        };
    } | null>;
    deleteUser(id: string, password: string): Promise<{
        "Usuario excluido": string | undefined;
    } | null>;
}
declare const _default: UsersService;
export default _default;
//# sourceMappingURL=usersServices.d.ts.map