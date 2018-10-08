// Requiring our models
var db = require("../models");

// Routes
module.exports = function (app) {

    //route for getting all of the accounts
    app.get("/api/account", function (req, res) {
        var query = {};
        if (req.query.ownerId) {
            query.OwnerId = req.query.ownerId;
        }
        db.Account.findAll({
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
    app.get("/api/account/:id", function (req, res) {
        db.Account.findOne({
            where: {
                id: req.params.id
            }
            //[{include: db.Account}]
        }).then(function (dbAccounts) {
            console.log(dbAccounts);
            res.json(dbAccounts);
        });
    });

    //route for retrieving url
    app.get("/api/account/:url", function (req, res) {
        db.Account.findOne({
            where: {
                id: req.params.url
            }
            //[{include: db.Accounts}]
        }).then(function (dbAccounts) {
            console.log(dbAccounts);
            res.json(dbAccounts);
        });
    });

    //route for saving a new Accounts
    app.post("/api/account", function (req, res) {
        db.Accounts.create(req.body).then(function (dbAccounts) {
            res.json(dbAccounts);
        });
    });

    //route for deleting Accounts
   app.delete("/api/account/:id", function (req, res) {
        db.Accounts.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbAccounts) {
            res.json(dbAccounts);
        });
    });

    //route for updating Accounts
    app.put("/api/account", function (req, res) {
        db.Accounts.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbAccounts) {
                res.json(dbAccounts);
            });
    });
};
