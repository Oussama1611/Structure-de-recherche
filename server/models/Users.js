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
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    
    // membres et ses publications
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
      Users.belongsTo(models.Teams);
   };
   
   
    return Users;
  };