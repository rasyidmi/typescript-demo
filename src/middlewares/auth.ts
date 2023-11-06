import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth_service.js";

class Authentication {
    static loginAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.header("authorization");
            if (!authHeader) return res.status(401).json({ message: "No Token" });
            if (!authHeader.startsWith("Bearer "))
                return res.status(401).json({ message: "Invalid Token" });

            const token = authHeader.substring(7, authHeader.length);
            const payload = AuthService.verifyJwt(token);
            req.body.payload = { username: payload.username, role: payload.role };
            next();
        } catch (error) {
            next(error);
        }
    }

    static adminAuth(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.payload.role != 1) return res.status(401).json({ message: "You are not admin" });
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default Authentication;