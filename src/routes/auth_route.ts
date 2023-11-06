import { Router } from "express";
import AuthController from "../controllers/auth_controller.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.requestAccessToken);

export default authRouter;