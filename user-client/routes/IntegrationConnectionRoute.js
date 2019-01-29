/******* PACKAGES *******/
const express = require("express");
var router = express.Router();

/******* HELPERS *******/
var validator = require("../helpers/validator.js");
var integrationConnectionController = require("../controllers/IntegrationConnectionController.js");


router.post("/register", function (req, res) {
    var clientToken = req.headers["client-token"];
    var integrationConnection = req.body;
    console.log("here", clientToken)
    var validateSchema = validator.validateSchema(integrationConnection, "registerIntegrationConnection");
    console.log(validateSchema)
    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        console.log(errorMessage);
        return res.status(400).send(errorMessage);
    } else {
        integrationConnectionController.create(integrationConnection, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify({ response: data }));
            }
        });
    }
});


module.exports = router;