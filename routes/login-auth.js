var db = require("../models");

module.exports = function (app) {
    var user = db.User;
    app.get("/", function (req, res) {
        // check session first
        if (req.session.user) {
            res.send(`welcome back, ${req.session.user.firstName}.`);
        }
        // then check cookie
        else if (req.headers.cookie.indexOf("token=") !== -1) {
            // use regex to grab cookie from headers string
            var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
            // compare cookie against db records
            db.User.findOne({
                where: {
                    cookie: cookie
                }
            }).then(function (data) {
                if (data !== null) {

                    req.session.user = {
                        username: req.body.username,
                        password: req.body.password
                    }
                    return res.redirect("/");
                }
            })







            // no match, so clear cookie
            res.clearCookie("token");
            res.redirect("/");
        }
        // if no session or cookie, send initial login form
        else {
            res.send(".public/login.html");
        }
    });

    //   app.get("/other", function(req, res) {
    //     // only users with set session can see this route
    //     if (req.session.user) {
    //       res.send(`oh, it's ${req.session.user.name} again.`);
    //     }
    //     else {
    //       res.redirect("/");
    //     }
    //   });

    app.get("/logout", function (req, res) {
        // clear cookie and session
        res.clearCookie("token");
        req.session.destroy();

        res.redirect("/");
    });

    app.post("/login", function (req, res) {
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (dbLogin) {
            if (dbLogin !== null) {
                var token = "t" + Math.random();
                db.User.token = token;
                db.User.update({
                    cookie: token
                }, {
                        where: {
                            username: req.body.username
                        }
                    })
                req.session.user = {
                    username: req.body.username,
                    password: req.body.password
                }
            }
            else {
                console.log("Incorrect");
            }
        });
    });
}
