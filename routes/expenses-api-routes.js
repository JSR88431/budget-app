var db = require("../models");

module.exports = function(app) {

  app.get("/api/expenses", function(req, res) {
    db.expenses.findAll({}).then(function(dbExpenses) {
      res.json(dbExpenses);
    });
  });

  app.post("/api/expenses", function(req, res) {
    db.expenses.create({
      amount: req.body.amount,
      description: req.body.description
    }).then(function(dbExpenses) {
      res.json(dbExpenses);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/api/expenses/:id", function(req, res) {
    db.expenses.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });
};