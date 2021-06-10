module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define("Members", {
      team_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      member_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      member: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      more_info: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    });
  
    Members.associate = (models) => {
      Members.belongsTo(models.Teams, {
        foreignKey: "team_key",
        targetKey: "key"
      });
    };
  
    return Members;
  };