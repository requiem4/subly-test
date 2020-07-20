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

    public static async getFileTypePercents(fileType = '') {
        const totalFileCount = await FileModel.getTotalFileCount()

        const fileTypesCount = await FileModel.findAll({
            attributes: [
                [Sequelize.fn('count', Sequelize.col('id')), 'count'],
                [Sequelize.fn('AVG', Sequelize.col('size')), 'average'],
                'type'
            ],
            group: ['type'],
            raw: true,
        });
        let fileTypePercent = 0

        fileTypesCount.map((fileTypeCount: any) => {
            if (totalFileCount > 0) {
                fileTypeCount.percent = (fileTypeCount.count / totalFileCount) * FileModel.HUNDRED_PERCENT
            }
        })

        return fileTypesCount
    }

    public static async getFileTypeSizes(fileType = '') {
        let sizes;
        sizes = await FileModel.findAll({
            attributes: [
                [Sequelize.fn('min', Sequelize.col('size')), 'minSize'],
                [Sequelize.fn('max', Sequelize.col('size')), 'maxSize'],
                'type'],
            group: ['type'],
            raw: true,
        });
        sizes.map( (size: any) => {
            size.minMb = (size.minSize / 1024 / 1024).toFixed(2)
            size.maxMb = (size.maxSize / 1024 / 1024).toFixed(2)
        })
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