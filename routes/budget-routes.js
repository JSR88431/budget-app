// var db = require("../models");

// module.exports = function(app) {
//   app.get("/api/budget", function(req, res) {
//     db.Author.findAll({}).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.get("/api/budget/:id", function(req, res) {
//     db.Author.findOne({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.post("/api/budget", function(req, res) {
//     db.Author.create(req.body).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.delete("/api/budget/:id", function(req, res) {
//     db.Author.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

// };
