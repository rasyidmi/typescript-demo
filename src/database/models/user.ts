import { DataTypes, Model } from "sequelize";

import database from "../db_config.js";

interface UserAttributes {
    username: string,
    password: string,
    role: number,
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public username!: string
    public password!: string
    public role!: number
}

User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, {
    sequelize: database,
    timestamps: false
});

export interface UserInput extends Required<UserAttributes> { }
export interface UserOutput extends Required<UserAttributes> { }

export default User;
