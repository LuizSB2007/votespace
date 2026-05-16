import { Router } from "express";
import OptionController from "../controller/optionController.js";
const router = Router();
router.get("/:roomId", OptionController.getAll);
router.get("/:id", OptionController.getById);
router.post("/", OptionController.create);
router.patch("/:id", OptionController.update);
router.delete("/:id", OptionController.delete);
export default router;
//# sourceMappingURL=optionRoutes.js.map