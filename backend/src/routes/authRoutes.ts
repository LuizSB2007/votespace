import { Router } from "express";
import AuthController from "../controller/authController.js";
import UsersController from "../controller/usersController.js";

const router = Router();

router.post("/login", AuthController.login);

router.post("/valid", AuthController.userIsLoggedIn);

router.post("/register", UsersController.create)

export default router