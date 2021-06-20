module.exports = (sequelize, DataTypes) => {
    const Labos = sequelize.define("Labos", {
      laboratoire: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary : {
        type: DataTypes.STRING(1234),
        allowNull:true,
      }
     });
    // teams association 
    Labos.associate = (models) => {
      Labos.hasMany(models.Teams, {
        onDelete: "cascade",
        foreignKey :{
         allowNull:false
        }
     });
    }



    return Labos;
  };