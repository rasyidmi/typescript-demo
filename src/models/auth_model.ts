import RefreshToken, { RefreshTokenInput, RefreshTokenOutput } from "../database/models/refresh_token.js";

class AuthModel {
    static async createRefreshToken(payload: RefreshTokenInput): Promise<boolean> {
        const username = payload.username;
        const oldRefreshToken = await RefreshToken.findOne({ where: { username: username }, order: [["created_date", "DESC"]] });
        // Make old token invalid
        if (oldRefreshToken)
            await oldRefreshToken!.update({ isValid: false });
        // Create new token
        const isTokenExist = await RefreshToken.findByPk(payload.id);
        if (isTokenExist) return false;
        await RefreshToken.create(payload);
        return true;
    }

    static async getTokenByUsername(input: string): Promise<RefreshTokenOutput | null> {
        const refreshToken = await RefreshToken.findByPk(input);
        if (refreshToken) {
            if (refreshToken.isValid) {
                return refreshToken;
            }
        }
        return null;
    }
}

export default AuthModel;