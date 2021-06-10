module.exports = (sequelize, DataTypes) => {
    const Labos = sequelize.define("Labos", {
      key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
      },
      laboratoire: {
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

    return Labos;
  };