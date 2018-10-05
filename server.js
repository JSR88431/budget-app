// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8084;

// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);


// syncing sequelize models and starting app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});

