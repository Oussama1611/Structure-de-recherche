module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define("Teams", {
      team: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
   // labos association 
    Teams.associate = (models) => {
      Teams.belongsTo(models.Labos);
    };

   // users association 
   Teams.associate = (models) => {
    Teams.belongsTo(models.Users)};


    return Teams;
  };