import { Request, Response } from "express";
declare class VoteController {
    getVotesByRoomId(req: Request, res: Response): Promise<void>;
    getVotesByOptionId(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: VoteController;
export default _default;
//# sourceMappingURL=voteController.d.ts.map