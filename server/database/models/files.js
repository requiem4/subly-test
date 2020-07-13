'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
    id: DataTypes.Number,
    name: DataTypes.STRING,
    user_id: DataTypes.INT,
    type: DataTypes.ENUM,
    upload_duration: DataTypes.STRING,
    size: DataTypes.INT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
  });

  files.associate = function(models) {
    files.belongsTo(models.users, { as: 'user_id' });
  };
  return files;
};