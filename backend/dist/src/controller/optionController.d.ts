import { Request, Response } from "express";
declare class OptionController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: OptionController;
export default _default;
//# sourceMappingURL=optionController.d.ts.map