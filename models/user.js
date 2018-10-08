module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50]
      }
    },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cookie: {
        type: DataTypes.STRING
      },
      budget: {
        type: DataTypes.INTEGER
      }
    })
  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Expenses, {
      onDelete: "cascade"
    });
  };
  return User;
};

