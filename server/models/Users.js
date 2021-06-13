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
    
    // Users associate Posts 1:M
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
   };
    return Users;
  };