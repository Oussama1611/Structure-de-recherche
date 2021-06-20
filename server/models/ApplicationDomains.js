module.exports = (sequelize, DataTypes) => {
    const ApplicationDomains = sequelize.define("ApplicationDomains", {
    
      Application_domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
      
      return ApplicationDomains;
    };