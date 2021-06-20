module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define("Teams", {
      team: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary : {
        type: DataTypes.STRING(1234),
        allowNull: true,
      }
    });

   
     
   Teams.associate = (models) => {
    // association users
     Teams.hasMany(models.Users,{    // pour reperer l'equipe d'un membre
       onDelete : "cascade",
     });    

    // application domains
     Teams.hasMany(models.ApplicationDomains,{
       onDelete : "cascade"
     });

     // association labos
     Teams.belongsTo(models.Labos);
   }
    return Teams;
  };