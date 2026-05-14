import "dotenv/config";
import jwt from "jsonwebtoken";
export declare function generateToken(email: string, userId: string, role: string): {
    token: string;
};
export declare function verifyTokenValid(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map