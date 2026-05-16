import { Request, Response } from "express";
declare class AuthController {
    login(req: Request, res: Response): Promise<void>;
    userIsLoggedIn(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=authController.d.ts.map