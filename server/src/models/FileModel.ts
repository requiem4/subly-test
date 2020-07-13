'use strict';
import {Association, DataTypes, Model, Sequelize} from "sequelize";
import DatabaseConnection from "@config/sequelize";
import UserModel from "@models/UserModel";

const sequelize = DatabaseConnection.sequelize

class FileModel extends Model {
    public id!: number;
    public name!: string;
    public user_id!: number;
    public type: Array<string> = ['mp4', 'wav'];
    public upload_duration: number = 0;
    public size: number = 0;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();
    public static associate(models: any){
        FileModel.belongsTo(UserModel, { targetKey: "id", as: 'users' });
    };
    public static associations: {
        users: Association<FileModel, UserModel>;
    };
}

FileModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    type: {
        type: DataTypes.ENUM,
        values: ['mp4', 'wav'],
    },
    upload_duration: DataTypes.STRING,
    size: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
}, {
    tableName: 'files',
    sequelize
});
export default FileModel