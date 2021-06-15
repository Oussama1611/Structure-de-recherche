module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define("Contacts", {
      full_name : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      photo_path : {
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permanent_or_no :{
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      numberphone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      site_personnel: {
        type : DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING
      },
      
    });
    // Users association
    Contacts.associate = (models) => {
      models.Users.hasOne(Contacts,
        {foreignKey: {
          allowNull: false}
    });
      Contacts.belongsTo(models.Users);
    };
    return Contacts;
  };