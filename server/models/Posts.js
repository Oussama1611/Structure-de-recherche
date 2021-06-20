module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
      supportfile_path :{
        type: DataTypes.STRING,
        allowNull:true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    });
  
    return Posts;
 };