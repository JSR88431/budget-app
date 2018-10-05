module.exports = function(sequelize, DataTypes) {
    var Expenses = sequelize.define("expenses", {
      // account_Id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   validate: {
      //     len: [1, 20]
      //   }
      // },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
      }, 
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    Expenses.associate = function(models){
        Expenses.belongsTo(models.Account, {
            foreignKey: {
                // allowNull: false
            }
        })
    }
    return Expenses;
  };
  