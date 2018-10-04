module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define("Owner", {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
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
    
  });
  return Owner;
//   return tableName.create({
//     Country: 'Afghanistan',
//     PhoneCode: 93,
//     Capital: 'Kabul',
//     IndependenceYear: 1919
//   });
// });
};
