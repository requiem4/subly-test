import {Association, DataTypes, Model} from 'sequelize';
import db from '@config/sequelize'
import FileModel from "@models/FileModel";

const sequelize = db.sequelize
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt')

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  token: string;
  country_origin: string,
  created_at: Date,
  updated_at: Date,
}

/**
 * class UserModel
 */
class UserModel extends Model<UserInterface> implements UserInterface {
  private salt!: string;
  private password!: string;

  public id!: number;
  public email!: string;
  public name: string = '';
  public country_origin!: string;
  public created_at: Date = new Date();
  public updated_at: Date = new Date();
  public token: string = '';
  public saltRounds = 10;

  public readonly files?: FileModel[];

  public static associate(models: any) {
    UserModel.hasMany(FileModel, {
      sourceKey: "id",
      foreignKey: "user_id",
      as: "files", // this determines the name in `associations`!
    });
  };

  public static associations: {
    files: Association<UserModel, FileModel>;
  };

  public async validateUser() {
    const userModel = await UserModel.findOne({where: {email: this.email}});
    if (this.validate() && !userModel) {
      return true;
    }
    return false;
  }

  public async createUser() {
    this.setPassword(this.password);
    return await this.save();
  }

  /**
   * Generate salt method
   * @return string
   */
  private static generateSalt() {
    return crypto.randomBytes(16).toString('hex')
  }

  /**
   * Set user password
   * @param password
   */
  public setPassword(password: string) {
    this.password = bcrypt.hashSync(password, this.saltRounds);
  };

  /**
   * Validate user password
   * @param password
   */
  public validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  };

  private generateJWT() {
    return jwt.sign({
      id: this.id,
      email: this.email
    }, 'secret');
  }

  public toAuthJSON() {
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
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
      isUnique: function (email: string, done: Function) {
        UserModel.findOne({where: {email: email}})
            .done(function (err: Error, user: object) {
              if (err) {
                done(err);
              }
              if (user) {
                done(new Error('Email already in use'));
              }
              done();
            });
      }
    }
  },
  country_origin: DataTypes.STRING,
  password: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: 'users',
  sequelize
});

export default UserModel