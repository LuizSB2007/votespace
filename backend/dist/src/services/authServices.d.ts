import { LoginSchemaType } from "../schema/auth.schema.js";
declare class AuthService {
    authenticateUser(data: LoginSchemaType): Promise<{
        token: {
            token: string;
        };
        user: {
            id: string;
            name: string;
        };
    }>;
    userAuthenticated(data: string): Promise<"isValid" | "invalid">;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=authServices.d.ts.map