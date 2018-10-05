module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 20]
        }
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
        URL: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }
    });
    Account.associate = function(models){
        Account.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Account;
  };
  