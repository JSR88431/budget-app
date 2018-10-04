//starting point for the express server.
var express = require("express");

// seting up the express app
var app = express();
var PORT = process.env.PORT || 8080;

//models for syncing
var db = require("./models");

//express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// syncing sequelize models and starting app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
