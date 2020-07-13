'use strict';

import {Sequelize} from "sequelize";

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

interface DatabaseConnection {
    sequelize: Sequelize;
    Sequelize: Sequelize;
    models: []
}

class DatabaseConnection implements DatabaseConnection{
    public static sequelize = sequelize;
    public static Sequelize = Sequelize;
    public static models: [] = [];
    constructor() {
        sequelize
            .authenticate()
            .then(function (error: Error) {
                console.log('Connection has been established successfully.');
            })
            .catch(function (error: Error) {
                console.log('Unable to connect to the database:', error);
            });
    }

    public static loadModels() {
        fs.readdirSync(__dirname)
            .filter((file: string) => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach((file: string) => {
                const model = sequelize['import'](path.join(__dirname, file));
                // @ts-ignore
                DatabaseConnection.models[model.name] = model;
            });

        Object.keys(DatabaseConnection.models).forEach(modelName => {
            // @ts-ignore
            if (DatabaseConnection.models[modelName].associate) {
                // @ts-ignore
                DatabaseConnection.models[modelName].associate(DatabaseConnection);
            }
        });
    }
}
DatabaseConnection.loadModels();

export default DatabaseConnection
