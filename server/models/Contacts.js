module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define("Contacts", {
      full_name : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue: "Mon nom complet"
      },
      photo_path : {
        type: DataTypes.STRING,
        defaultValue: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Mon email"
      },
      permanent_or_no :{
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      numberphone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Mon numero"
      },
      site_personnel: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue:"Mon site personnel"
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: "Ma Bio"
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