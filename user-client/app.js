/******* PACKAGES *******/
const express = require("express");
const bodyParser = require("body-parser");
const validate = require('express-validation')
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/****** CORS *****/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, client-token");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

/******* HEADERVALIDATOR *******/
var headerValidator = require("./helpers/headerValidator");
/******* ROUTES *******/
var userRoute = require("./routes/UserRoute.js");
var clientRoute = require("./routes/ClientRoute.js");
/* var terminalRoute = require("./routes/TerminalRoute.js"); */
var integrationConnectionRoute = require("./routes/IntegrationConnectionRoute.js");
var erpRoute = require("./routes/ErpRoute.js");

/******* SERVICES *******/
app.use("/user", validate(headerValidator), userRoute);
app.use("/client", validate(headerValidator), clientRoute);
app.use("/integrationConnection", validate(headerValidator), integrationConnectionRoute);
app.use("/erp", validate(headerValidator), erpRoute);
/* app.use("/terminal", validate(headerValidator), terminalRoute); */


module.exports = app;