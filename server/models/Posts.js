module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supportfile_path :{
        type: DataTypes.STRING,
        allowNull:true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    });
  
    return Posts;
  };