'use strict';
import {Association, DataTypes, Model} from "sequelize";
import DatabaseConnection from "@config/sequelize";
import UserModel from "@models/UserModel";

const sequelize = DatabaseConnection.sequelize
const Sequelize = DatabaseConnection.Sequelize

class FileModel extends Model {
    private static totalFileCount = 0;
    private static readonly HUNDRED_PERCENT = 100;

    public static readonly MP4_FILE_TYPE = 'mp4'
    public static readonly WAV_FILE_TYPE = 'wav'
    public allTypes: Array<string> = ['mp4', 'wav']
    public id!: number;
    public name!: string;
    public path!: string;
    public user_id!: number;
    public type!: string;
    public upload_duration: number = 0;
    public size!: number|string;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    public static associate(models: any) {
        FileModel.belongsTo(UserModel, {targetKey: "id", as: 'users'});
    };

    public static associations: {
        users: Association<FileModel, UserModel>;
    };

    public static async getTotalFileCount() {
        if (FileModel.totalFileCount === 0) {
            FileModel.totalFileCount = await FileModel.count();
        }
        return FileModel.totalFileCount;
    }

    public static async getFileTypePercent(fileType = '') {
        const totalFileCount = await FileModel.getTotalFileCount()
        if (fileType !== FileModel.MP4_FILE_TYPE
            && fileType !== FileModel.WAV_FILE_TYPE) {
            return false
        }

        const fileTypeCount = await FileModel.findAndCountAll({
            where: {type: fileType}
        });
        let fileTypePercent = 0

        if (totalFileCount > 0) {
            fileTypePercent = (fileTypeCount.count / totalFileCount) * FileModel.HUNDRED_PERCENT
        }
        return fileTypePercent
    }

    public static async getFileTypeSizes(fileType = '') {
        let sizes = {
            max: 0,
            min: 0
        }
        sizes.min = await FileModel.findAll({
            attributes: [[Sequelize.fn('min', Sequelize.col('size')), 'size']],
            group: ['type'],
            raw: true,
        });
        sizes.max = await FileModel.findAll({
            attributes: [
                [Sequelize.fn('min', Sequelize.col('size')), 'size']
            ],
        });
        return sizes
    }
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