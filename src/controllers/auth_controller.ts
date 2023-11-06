import { NextFunction, Request, Response } from "express";
import moment from "moment";

import UserModel from "../models/user_model.js";
import { AuthError } from "../errors/auth_error.js";
import AuthService from "../services/auth_service.js";
import AuthModel from "../models/auth_model.js";

class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const user = await UserModel.findUserByUsername(body.username as string);
            if (!user) throw new AuthError("User not found");

            // Check password
            const encryptedPassword = AuthService.encryptPassword(body.password);
            if (user.password != encryptedPassword) {
                throw new AuthError("Wrong password");
            }
            // Create access and refresh token
            const accessToken = AuthService.signJwt({ username: user.username, role: user.role });
            let isSuccess = false;
            while (!isSuccess) {
                const refrehTokenId = AuthService.generateRefreshToken();
                const refreshToken = await AuthModel.createRefreshToken({
                    id: refrehTokenId, username: user.username, expiredDate: moment().add(1, "weeks"),
                });
                if (refreshToken) isSuccess = true;
                return res.status(200).json({ message: "Success login", data: { user: user, accessToken: accessToken, refreshToken: refrehTokenId } });
            }
        } catch (error) {
            next(error);
        }
    }

    static async requestAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            // Extract refresh token
            const authHeader = req.header("authorization");
            if (!authHeader) return res.status(401).json({ message: "No Token" });
            if (!authHeader.startsWith("Bearer "))
                return res.status(401).json({ message: "Invalid Token" });
            const refreshToken = authHeader.substring(7, authHeader.length);

            // Check token is valid or not
            const tokenData = await AuthModel.getTokenByUsername(refreshToken);
            if (!tokenData) throw new AuthError("Token not valid");
            if (moment().isAfter(tokenData.expiredDate)) throw new AuthError("Token expired");

            // Get the user data
            const user = await UserModel.findUserByUsername(tokenData.username);
            if (!user) throw new AuthError("User not exists");
            const accessToken = AuthService.signJwt({ username: user.username, role: user.role });

            return res.status(201).json({ message: "Token created", data: accessToken });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;