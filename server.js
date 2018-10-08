// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8084;


// add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "yolo", 
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto"}
}));

// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes

require("./routes/html-routes.js")(app);
require("./routes/api-user-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);
require("./routes/api-accounts-routes.js")(app);
require("./routes/login-auth.js")(app);

// syncing sequelize models and starting app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});

