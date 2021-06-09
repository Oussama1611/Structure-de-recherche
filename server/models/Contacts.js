module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define("Contacts", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberphone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    });
  
    Contacts.associate = (models) => {
      Contacts.belongsTo(models.Users
      );
    };
    return Contacts;
  };