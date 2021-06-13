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
      photo_path : {
        type: DataTypes.STRING,
        allowNull:true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberphone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      site_personnel: {
        type : DataTypes.STRING,
        allowNull: true,
      }
      
    });
  
    Contacts.associate = (models) => {
      models.Users.hasOne(Contacts,
        {foreignKey: {
          allowNull: false}
    });
      Contacts.belongsTo(models.Users);
    };
    return Contacts;
  };