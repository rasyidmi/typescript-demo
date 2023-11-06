import CryptoJS from "crypto-js";
import SHA256 from 'crypto-js/sha256.js';
import jwt from "jsonwebtoken";

import { AuthError } from "../errors/auth_error.js";
import { JwtPayload, JwtResponse } from "../commons/type.js";

class AuthService {
    static isPasswordValid(password: string) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (password.length < 8) {
            throw new AuthError("Your password needs a minimum of eight characters.");
        } else if (password.search(/[a-z]/) < 0) {
            throw new AuthError("Your password needs a lower case letter.");
        } else if (password.search(/[A-Z]/) < 0) {
            throw new AuthError("Your password needs an upper case letter.");
        } else if (password.search(/[0-9]/) < 0) {
            throw new AuthError("Your password needs a number.");
        } else if (!specialChars.test(password)) {
            throw new AuthError("Your password needs a special character.");
        }
    }

    static encryptPassword(password: string): string {
        const hashedPassword = JSON.stringify(SHA256(password).words);
        return hashedPassword;
    }

    static generateRefreshToken(): string {
        const token = CryptoJS.lib.WordArray.random(32).toString();
        return token;
    }

    static signJwt(payload: JwtPayload): string {
        const token = jwt.sign(payload, process.env.JWT_KEY as string, {
            expiresIn: "1h",
        });
        return token;
    }

    static verifyJwt(token: string): JwtPayload {
        const verified = jwt.verify(token, process.env.JWT_KEY as string) as JwtResponse;
        const payload = {
            username: verified.username,
            role: verified.role
        };
        return payload;
    }
}

export default AuthService;