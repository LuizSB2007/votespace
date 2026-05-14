import { LoginSchemaType } from "../schema/auth.schema.js";
declare class AuthService {
    authenticateUser(data: LoginSchemaType): Promise<{
        token: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=authServices.d.ts.map