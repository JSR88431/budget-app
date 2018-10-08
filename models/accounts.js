module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
      accountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 20]
        },
      },accountUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20]
        },
      },
        budget: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            len: [1, 50]
          },
        URL: {
          type: DataTypes.STRING,
          allowNull: false,
          // validate: {
          //   isUrl: true
          // }
        },
      }
    });
    Account.associate = function(models){
        Account.belongsTo(models.User, {
          allowNull: false
        })
    }
    return Account;
  };
  