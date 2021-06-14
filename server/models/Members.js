module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define("Members", {
      team_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      member_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permanent_or_no :{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      member_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    });
   //----------------------
    Members.associate = (models) => {
      Members.belongsTo(models.Teams, {
        foreignKey: "team_key",
        targetKey: "key"
      });
    };
    //----------------------
    Members.associate = (models) => {
      models.Users.hasOne(Members,
        {foreignKey: {
          allowNull: false}
    });
      Members.belongsTo(models.Users);
    };
    
  
    return Members;
  };