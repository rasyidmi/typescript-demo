import { DataTypes, Model, Optional } from "sequelize";

import database from "../db_config.js";

interface RefreshTokenAttributes {
    id: string,
    username: string,
    expiredDate: moment.Moment,
    createdDate: moment.Moment,
    isValid: boolean,
}

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenInput> implements RefreshTokenAttributes {
    public id!: string
    public username!: string
    public expiredDate!: moment.Moment
    public createdDate!: moment.Moment
    public isValid!: boolean
}

RefreshToken.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiredDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expired_date"
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_date"
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "is_valid",
        defaultValue: true
    }
}, {
    sequelize: database,
    timestamps: false
});

export interface RefreshTokenInput extends Optional<RefreshTokenAttributes, "createdDate" | "isValid"> { }
export interface RefreshTokenOutput extends Required<RefreshTokenAttributes> { }

export default RefreshToken;
