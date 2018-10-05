// Requiring our models
var db = require("../models");

module.exports = function (app) {
    app.post("/api/expenses", function(req, res) {
        console.log(req.body);

        db.expenses.create({
          amount: req.body.amount,
          description: req.body.description
        }).then(function(dbExpenses) {

          res.json(dbExpenses);
        });
      });
    }

//     //route for getting all of the users
//     app.get("/api/user", function (req, res) {
//         var query = {};
//         if (req.query.user_id) {
//             query.UserId = req.query.user_id;
//         }
//         db.User.findAllUsers({
//             // include:[{
//             //   model: db.User,
//             // }],
//             // limit: 3
//             where: query
//         }).then(function (dbUser) {
//             res.json(dbUser);
//         });
//     });

//     //route for retrieving a single user
//     app.get("/api/user/:id", function (req, res) {
//         db.User.findOne({
//             where: {
//                 id: req.params.id
//             }
//             //[{include: db.User}]
//         }).then(function (dbUser) {
//             console.log(dbUser);
//             res.json(dbUser);
//         });
//     });

//     //route for saving a new user
//     app.saveNewUser("/api/user", function (req, res) {
//         db.User.create(req.body).then(function (dbUser) {
//             res.json(dbUser);
//         });
//     });

//     //route for deleting user
//     app.delete("/api/user/:id", function (req, res) {
//         db.User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         }).then(function (dbUser) {
//             res.json(dbUser);
//         });
//     });

//     //route for updating user
//     app.put("/api/user", function (req, res) {
//         db.User.update(
//             req.body,
//             {
//                 where: {
//                     id: req.body.id
//                 }
//             }).then(function (dbUser) {
//                 res.json(dbUser);
//             });
//     });
// };
