/******* PACKAGES *******/
const express = require("express");
var router = express.Router();

/******* HELPERS *******/
var validator = require("../helpers/validator.js");

/******* CONTROLLER *******/
var erpController = require("../controllers/ERPController.js");

router.post("/register", function (req, res) {
    var clientToken = req.headers["client-token"];
    var erp = req.body;
    var validateSchema = validator.validateSchema(erp, "erpSchema");

    if (validateSchema) {
        var errorMessage = { status: 400, message: `Field ${validateSchema.details[0].message}` };
        return res.status(400).send(errorMessage);
    } else {
        erpController.addErp(erp, clientToken, (err, data) => {
             if (err) {
                let response = JSON.parse(data);
                return res.status(response.statusCode).send(response.response);
            } else {
                return res.status(200).send(JSON.stringify({ response: data }));
            } 
        });
    }
});

router.get("/headers/:UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let erpData = req.params.UID;
    console.log("cient", erpData);
    erpController.loadHeaders(erpData, clientToken, (err, headers) => {
        if (err) {
            let response = JSON.parse(headers);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: headers }));
        }
    });
});

router.get("/sync-data/:Header_UID/:Client_UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let POS_Report_Header_UID = req.params.Header_UID;
    let System_Client_UID = req.params.Client_UID;

    let erpData = { POS_Report_Header_UID: POS_Report_Header_UID, System_Client_UID: System_Client_UID };
    erpController.loadData(erpData, clientToken, (err, syncData) => {
        if (err) {
            let response = JSON.parse(syncData);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: syncData }));
        }
    });
});

router.get("/header-types/:Header_UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let POS_Report_Header_UID = req.params.Header_UID;

    let erpData = { POS_Report_Header_UID: POS_Report_Header_UID };
    erpController.getReportDataTypes(erpData, clientToken, (err, reportDataTypes) => {
        if (err) {
            let response = JSON.parse(reportDataTypes);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: reportDataTypes }));
        }
    });
});

router.get("/report-data/:Header_UID/:Type_UID/:Client_UID", function (req, res) {
    var clientToken = req.headers["client-token"];
    let POS_Report_Header_UID = req.params.Header_UID;
    let POS_Report_Data_TypeID = req.params.Type_UID;
    let System_Client_UID = req.params.Client_UID;
    let erpData = { POS_Report_Header_UID: POS_Report_Header_UID, POS_Report_Data_TypeID: POS_Report_Data_TypeID, System_Client_UID: System_Client_UID };
    erpController.getReportData(erpData, clientToken, (err, reportData) => {
        if (err) {
            let response = JSON.parse(reportData);
            return res.status(response.statusCode).send(response.response);
        } else {
            return res.status(200).send(JSON.stringify({ response: reportData }));
        }
    });
});
module.exports = router;