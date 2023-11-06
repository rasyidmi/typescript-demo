import User, { UserInput, UserOutput } from "../database/models/user.js";

class UserModel {
    static async createUser(payload: UserInput): Promise<UserOutput> {
        const newUser = await User.create(payload);
        return newUser;
    }
    static async findUserByUsername(username: string): Promise<UserOutput | null> {
        const user = await User.findByPk(username);
        if (!user) return null;
        return user;
    }

    static async changePassword(username: string, newPassword: string) {
        const user = await User.findByPk(username);
        await user!.update({ password: newPassword });
    }
}

export default UserModel;