module.exports = (sequelize, DataTypes) => {
    const Labos = sequelize.define("Labos", {
      laboratoire: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     });
    // teams association 
    Labos.associate = (models) => {
      Labos.hasMany(models.Teams, {
        foreignKey: 'laboId'
      });
    };

    // users association 
    Labos.associate = (models) => {
      Labos.belongsTo(models.Users)};

    return Labos;
  };