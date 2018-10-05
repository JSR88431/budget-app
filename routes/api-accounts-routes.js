// Requiring our models
var db = require("../models");

// Routes
module.exports = function (app) {

    //route for getting all of the accounts
    app.get("/api/ownerId", function (req, res) {
        var query = {};
        if (req.query.ownerId) {
            query.OwnerId = req.query.ownerId;
        }
        db.Accounts.findAll({
            // include:[{
            //   model: db.Account,
            // }],
            // limit: 3
            where: query
        }).then(function (dbAccounts) {
            res.json(dbAccounts);
        });
    });

    //route for retrieving a single account
    app.get("/api/acount/:id", function (req, res) {
        db.Account.findOne({
            where: {
                id: req.params.id
            }
            //[{include: db.Account}]
        }).then(function (dbAccount) {
            console.log(dbAccount);
            res.json(dbAccount);
        });
    });

    //route for saving a new account
    app.saveNewAccount("/api/account", function (req, res) {
        db.Account.create(req.body).then(function (dbAccount) {
            res.json(dbAccount);
        });
    });

    //route for deleting Account
   app.delete("/apiAccount/:id", function (req, res) {
        db.Account.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbAccount) {
            res.json(dbAccount);
        });
    });

    //route for updating account
    app.put("/api/account", function (req, res) {
        db.Account.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbAccou) {
                res.json(dbAccou);
            });
    });
};
