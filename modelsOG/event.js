'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Stage, StageEvent }) {
      // stages
      Event.belongsToMany(Stage, {
          foreignKey: "event_id",
          as: "stages", 
          through: StageEvent
      })
      // meet and greets 
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })

      // set times 
      Event.hasMany(SetTime, {
        foreignKey: "event_id",
        as: "set_times"
      })
    }
  }
  event.init({
    event_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true 
    },
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'event',
    tableName: 'bands',
    timestamps: false
  });
  return event;
};
