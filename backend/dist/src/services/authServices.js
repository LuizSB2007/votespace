import prisma from "../utils/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyTokenValid } from "../utils/jwt.js";
class AuthService {
    //Autentica um usuário, verificando o email e a senha
    async authenticateUser(data) {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !await comparePassword(data.password, user.passwordHash || ''))
            throw new Error("Email ou senha incorretos");
        return {
            token: generateToken(user.email, user.id, user.role), user: { id: user.id, name: user.name } //Cria um token qu permitirá o acesso do usuário nas rotas privadas
        };
    }
    async userAuthenticated(data) {
        const isValid = verifyTokenValid(data);
        return isValid;
    }
}
export default new AuthService();
//# sourceMappingURL=authServices.js.map