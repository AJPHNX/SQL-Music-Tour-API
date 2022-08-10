'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // Events 
     Stage.belongsToMany(Event, {
      foreignKey: "stage_id",
      as: "events",
      through: StageEvent
    })

    // Set times 
    Stage.hasMany(SetTime, {
      foreignKey: "stage_id",
      as: "set_times"
    })
    }
  }
  stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true 
  },
    stage_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'stage',
    tableName: 'bands',
    timestamps: false
  });
  return stage;
};