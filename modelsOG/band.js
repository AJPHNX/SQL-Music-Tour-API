'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MeetGreet }) {
      Band.hasMany(MeetGreet, {
      // meet and greets
        foreignKey: "band_id",
        as: "meet_greets"
      })
       // set times 
       Band.hasMany(SetTime, {
        foreignKey: "band_id",
        set_times: "set_times"
      })
    
    }
  }
  Band.init({
    // id: DataTypes.INTEGER,
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
    name: DataTypes.STRING,
    genre: DataTypes.TEXT,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    //recommendation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'band',
    tableName: 'bands',
    timestamps: false
  });
  return Band;
};

