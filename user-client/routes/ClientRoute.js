/******* PACKAGES *******/
const express = require("express");
var router = express.Router();

/******* HELPERS *******/
var validator = require("../helpers/validator.js");

/******* CONTROLLER *******/
var clientController = require("../controllers/ClientController.js");


router.post("/register", function (req, res) {
    var clientToken = req.headers["client-token"];

    var client = req.body;
    var validateSchema = validator.validateSchema(client, "clientschema");

    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        clientController.addClient(client, clientToken, (err, data) => {
            if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify({ response: data }));
            }
        });
    }
});


router.post("/administer", function (req, res) {
    var clientToken = req.headers["client-token"];
    var client = req.body;
    var validateSchema = validator.validateSchema(client, "administerSchema");

    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        clientController.administrateClient(client, clientToken, (err, data) => {
            if (err) {
                console.log(data);
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify({ response: "Success!" }));
            }
        });
    }
});


router.put("/update/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    var client = req.body;
    var validateSchema = validator.validateSchema(client, "clientschema");
    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        var Client_UID = req.params.UID;
        client.Client_UID = Client_UID;
        clientController.updateClient(client, clientToken, (err, data) => {
            if (err) {
                console.log(data);
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify(data[0]));
            }
        });
    }
});


router.get("/single/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let Client_UID = req.params.UID;
    clientController.getClient(Client_UID, clientToken, (err, data) => {
        if (err) {
            console.log(data);
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(data);
        }
    });
});


router.delete("/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let Client_UID = req.params.UID;
    let clientData = {};
    clientData.Client_UID = Client_UID;
    clientController.disableClient(clientData, clientToken, (err, data) => {
        if (err) {
            console.log(data);
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: "Success!" }));
        }
    });
});


router.get("/all/:status?", function (req, res) {
    var clientToken = req.headers["client-token"];
    var status = req.query.status;
    clientController.getClients(status, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: data }));
        }
    });
});


router.get("/authenticate-client/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    var Client_UID = req.params.UID;
    var client = {};
    client.Client_UID = Client_UID;
    clientController.authenticateClient(client, clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response)
        } else {
            return res.status(200).send(JSON.stringify({ response: "Success!" }));
        }
    });
});

router.get("/activate/:UID", function (req, res) {

    var clientToken = req.headers["client-token"];
    let Client_UID = req.params.UID;
    let clientData = {};
    clientData.Client_UID = Client_UID;
    clientController.activateClient(clientData, clientToken, (err, data) => {
        if (err) {
            console.log(data);
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: "Success!" }));
        }
    });
});

router.get("/available-children/:client?", function (req, res) {
    var clientToken = req.headers["client-token"];
    var Client_UID = req.query.client;
    clientController.getChildClients(clientToken, Client_UID, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: data }));
        }
    });
});

router.get("/current/child", function (req, res) {
    var clientToken = req.headers["client-token"];

    clientController.getChildClientsOfParent(clientToken, (err, data) => {
        if (err) {
            let response = JSON.parse(data);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: data }));
        }
    });
});
module.exports = router;


