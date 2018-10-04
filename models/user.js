module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
<<<<<<< HEAD
        allowNull: false
      },
      weekleyFunds: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull:true
      }
    },
    // body: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    // category: {
    //   type: DataTypes.STRING,
    //   defaultValue: "Personal"
    // },{
      // freezeTableName: true,
      // timestamps: false
    
=======
        allowNul: false
      }
    }
  },
    {
      freezeTableName: true,
      timestamps: false
>>>>>>> modals
  });
  return User;
};
