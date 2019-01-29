/******* PACKAGES *******/
const express = require("express");
var router = express.Router();


/******* HELPERS *******/
var validator = require("../helpers/validator.js");

/******* CONTROLLER *******/
var terminalController = require("../controllers/TerminalController.js");


router.post("/register", function (req, res) {
    var clientToken = req.headers["client-token"];
    var terminal = req.body;
    var validateSchema = validator.validateSchema(terminal, "terminalSchema");
    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        terminalController.addTerminal(terminal, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(data);
            }
        });
    }

});

router.put("/update/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];

    var Terminal_UID = req.params.UID;
    var terminal = req.body;
    var validateSchema = validator.validateSchema(terminal, "terminalSchema");
    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        terminal.Terminal_UID = Terminal_UID;
        terminalController.updateTerminal(terminal, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(data);
            }
        });
    }
});

router.get("/single/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    var Terminal_UID = req.params.UID;
    var terminal = {};
    terminal.Terminal_UID = Terminal_UID;
    terminalController.getTerminal(terminal, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            console.log(response.response);
            return res.status(response.statusCode).send(response.response);
        } else {
            console.log(data);
            return res.status(200).send(data);
        }
    });
});

router.get("/", function (req, res) {
    var clientToken = req.headers["client-token"];

    terminalController.getAllTerminals(clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {

            return res.status(200).send(data);
        }
    });
});

router.get("/clients/:array?", function (req, res) {
    var clientToken = req.headers["client-token"];
    var clients = req.query.array;
console.log("clients", clients);
    terminalController.getByClientUID(clients, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {           
            return res.status(200).send(data);
        }
    });
});

router.delete("/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];

    var Terminal_UID = req.params.UID;
    var terminal = {};
    terminal.Terminal_UID = Terminal_UID;
    terminalController.disableTerminal(terminal, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: "Success" }));
        }
    });
});

module.exports = router;