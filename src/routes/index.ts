import { Router } from "express";

import userRouter from "./user_route.js";
import { errorHandler } from "../middlewares/error_handler.js";
import authRouter from "./auth_route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use(errorHandler);

export default router;