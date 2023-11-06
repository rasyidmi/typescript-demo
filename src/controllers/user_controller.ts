import { NextFunction, Request, Response } from "express";

import UserModel from "../models/user_model.js";
import AuthService from "../services/auth_service.js";
import { AuthError } from "../errors/auth_error.js";

class UserController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            // Check duplicate user
            const user = await UserModel.findUserByUsername(body.username as string);
            if (user) throw new AuthError("User already exists");
            // Check password
            AuthService.isPasswordValid(body.password as string);
            // Hash password
            const encryptedPassword = AuthService.encryptPassword(body.password as string);
            const newUser = await UserModel.createUser({ username: body.username as string, password: encryptedPassword, role: body.role as number });

            return res.status(201).json({ message: "User created", data: newUser });
        } catch (error) {
            next(error);
        }
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const oldPassword = body.oldPassword;
            const newPassword = body.newPassword;

            // Check is the old password match.
            const user = await UserModel.findUserByUsername(body.payload.username as string);
            if (!user) return res.status(404).json({ message: "User not found" });
            const oldPasswordEncrypted = AuthService.encryptPassword(oldPassword);
            if (oldPasswordEncrypted != user.password) return res.status(303).json({ message: "Wrong password" });

            // Change the password
            const encryptedPassword = AuthService.encryptPassword(newPassword);
            await UserModel.changePassword(user.username, encryptedPassword);
            return res.status(200).json({ message: "Success change password" })
        } catch (error) {
            next(error);
        }
    }

    static async adminOnlyRequest(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({ message: "Success" });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;