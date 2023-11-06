import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERROR: ${err}`);
    switch (err.name) {
        case "AuthError":
            return res.status(400).json({
                message: err.message,
                request: { type: req.method, url: req.originalUrl },
            });
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({
                message: "Please input valid data.",
                request: { type: req.method, url: req.originalUrl },
            });
        case "JsonWebTokenError":
            return res.status(401).json({
                message: "Token invalid",
                request: { type: req.method, url: req.originalUrl },
            });
        default:
            return res.status(500).json({
                message: "Internal Server Error",
                request: { type: req.method, url: req.originalUrl },
            });
    }
}