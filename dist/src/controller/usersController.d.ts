import { Request, Response } from 'express';
declare class UserController {
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=usersController.d.ts.map