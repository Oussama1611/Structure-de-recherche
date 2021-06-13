module.exports = (sequelize, DataTypes) => {
    const ApplicationDomains = sequelize.define("ApplicationDomains", {
    
      Application_domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
      ApplicationDomains.associate = (models) => {
        models.Teams.hasMany(ApplicationDomains,{
            foreignKey:'key'
        })
        ApplicationDomains.belongsTo(models.Teams)
      };
      return ApplicationDomains;
    };