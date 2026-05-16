import "dotenv/config";
import jwt from "jsonwebtoken";
//Gera um token json
export function generateToken(email, userId, role) {
    const token = jwt.sign({ email, userId, role }, process.env.AUTH_KEY, { expiresIn: "1d" }); //Token com validade de um dia
    return { token };
}
//Verifica se o token do usuário é válido
export function verifyTokenValid(token) {
    const response = jwt.verify(token, process.env.AUTH_KEY);
    return response ? "isValid" : "invalid";
}
//# sourceMappingURL=jwt.js.map