/******* PACKAGES *******/
const express = require("express");
var router = express.Router();


/******* HELPERS *******/
var validator = require("../helpers/validator.js");

/******* CONTROLLER *******/
var userController = require("../controllers/UserController.js");

router.post("/register", function (req, res) {
    var clientToken = req.headers["client-token"];
    console.log(clientToken);
    var user = req.body;
    var validateSchema = validator.validateSchema(user, "userschema");
    console.log(user);
    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        console.log(errorMessage);
        return res.status(400).send(errorMessage);
    } else {
        userController.register(user, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify({ response: "Success!" }));
            }
        });
    }

});

router.put("/update", function (req, res) {
    var clientToken = req.headers["client-token"];
    var user = req.body;
    var validateSchema = validator.validateSchema(user, "userschema");

    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        userController.update(user, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response)
            } else {
                return res.status(200).send(JSON.stringify({ response: "Success!" }));
            }
        });
    }
});

router.get("/roles", function(req, res) {
    var clientToken = req.headers["client-token"];
    
    userController.getRolesForUser(clientToken, function(err, data) {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response)
        } else {
            return res.status(200).send(JSON.stringify({ response: data }));
        }
    });
});


module.exports = router;