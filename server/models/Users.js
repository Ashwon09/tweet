module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Users;
};
