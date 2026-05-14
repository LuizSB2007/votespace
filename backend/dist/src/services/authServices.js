import prisma from "../utils/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
class AuthService {
    //Autentica um usuário, verificando o email e a senha
    async authenticateUser(data) {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !await comparePassword(data.password, user.passwordHash || ''))
            throw new Error("Email ou senha incorretos");
        return generateToken(user.email, user.id, user.role); //Cria um token qu permitirá o acesso do usuário nas rotas privadas
    }
}
export default new AuthService();
//# sourceMappingURL=authServices.js.map