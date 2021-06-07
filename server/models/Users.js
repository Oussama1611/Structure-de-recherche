module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    });
    // Users associate Members 1:1
    Users.associate = (models) => {
      Users.hasOne(models.Members, {
        foreignKey: "username",
        targetKey: "username"
      });
    };
    // Users associate Posts 1:M
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
   };
    return Users;
  };