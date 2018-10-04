module.exports = function(sequelize, DataTypes) {
    var Expenses = sequelize.define("expenses", {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 20]
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
        description: {
          type: DataTypes.STRING,
          allowNul: false
        },
      }
    });
    Expenses.associate = function(models){
        Expenses.belongsTo(models.Account, {
            foreignKey: {
                allowNul: false
            }
        })
    }
    return Owner;
  };
  