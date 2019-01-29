/******* PACKAGES *******/
const express = require("express");
const bodyParser = require("body-parser");
const validate = require('express-validation')
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/******* HEADERVALIDATOR *******/
var headerValidator = require("./helpers/headerValidator");

/******* ROUTES *******/
var terminalRoute = require("./routes/TerminalRoute.js");
var terminalConnectionRoute = require("./routes/TerminalConnectionRoute.js");

/******* SERVICES *******/
app.use("/terminal", validate(headerValidator), terminalRoute);
app.use("/terminal-connection",  validate(headerValidator), terminalConnectionRoute);

app.use(function (err, req, res, next) {
    return res.status(400).json(err);
}); 
module.exports = app;
