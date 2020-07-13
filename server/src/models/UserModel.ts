import {DataTypes, Model, Options, Association} from 'sequelize';
import db from '@config/sequelize'
import FileModel from "@models/FileModel";

const sequelize = db.sequelize
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
  country_origin: string,
  created_at: Date,
  updated_at: Date,
  salt: string;
}

/**
 * class UserModel
 */
class UserModel extends Model<UserInterface> implements UserInterface {
  public id!: number;
  public name: string = '';
  public password!: string;
  public email!: string;
  public country_origin!: string;
  public created_at: Date = new Date();
  public updated_at: Date = new Date();
  public token: string = '';

  public readonly files?: FileModel[];

  public static associate(models: any){
    UserModel.hasMany(FileModel, {
      sourceKey: "id",
      foreignKey: "user_id",
      as: "files", // this determines the name in `associations`!
    });
  };
  public static associations: {
    files: Association<UserModel, FileModel>;
  };

  get salt() {
    return crypto.randomBytes(16).toString('hex');
  }

  setPassword(password: string) {
    this.token = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
  };

  validatePassword(password: string) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.token === hash;
  };

  generateJWT() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.id,
      exp: (expirationDate.getTime() / 1000).toString(10),
    }, 'secret');
  }

  toAuthJSON() {
    return {
      _id: this.id,
      email: this.email,
      token: this.generateJWT(),
    };
  };
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  country_origin: DataTypes.STRING,
  password: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: 'users',
  sequelize
});

export default UserModel