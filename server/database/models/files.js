'use strict';

module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
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
  });

  files.associate = function(models) {
    files.belongsTo(models.users);
  };
  return files;
};