import { Router } from "express";
import UserController from "../controllers/user_controller.js";
import Authentication from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", UserController.registerUser);
userRouter.put("/change-password", Authentication.loginAuth, UserController.changePassword);
userRouter.get("/admin-only", Authentication.loginAuth, Authentication.adminAuth, UserController.adminOnlyRequest);

export default userRouter;

