module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define("Teams", {
      key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      labo_key: {
        type: DataTypes.INTEGER,
        
        allowNull: false,
      },
      team: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responsible: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Teams.associate = (models) => {
      Teams.belongsTo(models.Labos, {
        foreignKey: "labo_key",
        targetKey: "key"
      });
    };
    return Teams;
  };