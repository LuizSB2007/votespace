import { Router } from "express";
import voteController from "../controller/voteController";
const router = Router();
router.get("/room/:id", voteController.getVotesByRoomId);
router.get("/option/:id", voteController.getVotesByOptionId);
router.post("/", voteController.create);
router.delete("/:id", voteController.delete);
export default router;
//# sourceMappingURL=voteRoutes.js.map