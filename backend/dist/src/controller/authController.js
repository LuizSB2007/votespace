import authServices from "../services/authServices.js";
import { LoginSchema } from "../schema/auth.schema.js";
class AuthController {
    //loga um usuário
    async login(req, res) {
        const data = LoginSchema.parse(req.body);
        const result = await authServices.authenticateUser(data);
        res.status(200).json(result);
    }
    //Verifica se um token ainda está valido
    async userIsLoggedIn(req, res) {
        const data = req.headers.authorization?.split(" ")[1];
        if (data === "null")
            return res.json("token invalid");
        const result = await authServices.userAuthenticated(data);
        return res.status(200).json(result);
    }
}
export default new AuthController();
//# sourceMappingURL=authController.js.map