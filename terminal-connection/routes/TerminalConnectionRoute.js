/******* PACKAGES *******/
const express = require("express");
var router = express.Router();
const fs = require("fs");

/******* HELPERS *******/
var validator = require("../helpers/validator.js");

/******* CONTROLLER *******/
var terminalConnectionController = require("../controllers/TerminalConnectionController.js");



router.get("/generate/:client?/:terminal?", function (req, res) {
    var clientToken = req.headers["client-token"];
    var terminalConnection = {};
    terminalConnection.Client_UID = req.query.client;
    terminalConnection.Terminal_UID = req.query.terminal;
    var validateSchema = validator.validateSchema(terminalConnection, "configFileForTerminalSchema");

    terminalConnectionController.generateConfigFile(terminalConnection, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            let path = JSON.parse(data);
            var configPath = '';
            var rootPath = '';
            if (path.configPath) {
                configPath = path.configPath;
                rootPath = path.rootPath;
                res.status(200).download(configPath, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.unlink(configPath);
                        fs.unlink(rootPath);
                    }
                });
            }
        }

    });

});

router.put("/update/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    var Terminal_Connection_UID = req.params.UID;
    var terminalConnection = req.body;
    var validateSchema = validator.validateSchema(terminalConnection, "terminalConnectionUpdateSchema");

    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        terminalConnection.Terminal_Connection_UID = Terminal_Connection_UID;
        terminalConnectionController.updateTerminalConnection(terminalConnection, clientToken, (err, data) => {
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
    var terminalConnection = {};
    terminalConnection.Terminal_UID = Terminal_UID;

    terminalConnectionController.getTerminalConnection(terminalConnection, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(data);
        }
    });
});

router.get("/:terminals?", function (req, res) {
    var clientToken = req.headers["client-token"];
    var terminals = req.query.terminals;
    console.log('erere', terminals);
    terminalConnectionController.getAllTerminalConnections(terminals, clientToken, (err, data) => {
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
    var Terminal_Connection_UID = req.params.UID;
    var terminalConnection = {};
    terminalConnection.Terminal_Connection_UID = Terminal_Connection_UID;

    terminalConnectionController.distableTerminal(terminalConnection, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: "Success" }));
        }
    });
});

router.get("/download-config/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    var terminalConnection = {};
    terminalConnection.Terminal_UID = req.params.UID;

    terminalConnectionController.downloadConfig(terminalConnection, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
           let path = JSON.parse(data);
            var configPath = '';
            var rootPath = '';
            if (path.configPath) {
                configPath = path.configPath;
                rootPath = path.rootPath;
                res.status(200).download(configPath, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.unlink(configPath);
                        fs.unlink(rootPath);
                    }
                });
            } 
        }

    });
});

module.exports = router;