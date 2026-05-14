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
        "Ususario criado com sucesso, token de autentica\u00E7\u00E3o: ": {
            token: string;
        };
    }>;
    updateUser(id: string, data: UpdateUserSchemaType): Promise<"Usuario atualizado" | "Senha incorreta">;
    deleteUser(id: string, password: string): Promise<"Senha incorreta" | "Usuario excluido">;
}
declare const _default: UsersService;
export default _default;
//# sourceMappingURL=usersServices.d.ts.map