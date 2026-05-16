import "dotenv/config";
export declare function generateToken(email: string, userId: string, role: string): {
    token: string;
};
export declare function verifyTokenValid(token: string): "isValid" | "invalid";
//# sourceMappingURL=jwt.d.ts.map