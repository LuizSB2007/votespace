import { Request, Response } from 'express';
declare class UserController {
    getAll(req: Request, res: Response): Promise<void>;
    getUser(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=usersController.d.ts.map