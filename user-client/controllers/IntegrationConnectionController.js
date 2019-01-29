var integrationConnectionController = {};

/******* HELPERS *******/
const dbController = require("../dblayer/dbcontroller.js");
const authenticator = require("../helpers/authenticator");

integrationConnectionController.create = (integrationConnectionBody, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
    .then(function (data) {
        if (data.statusCode == 401) {
            return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
        } else {
            let Integration_Connection_UID = null;
            let System_Client_UID = integrationConnectionBody.Client_UID;
            let Integration_Connection_TypeID = integrationConnectionBody.Integration_Connection_TypeID;
            let Integration_Connection_MSTR5 = integrationConnectionBody.Integration_Connection_MSTR5;
            let Integration_Connection_MSTR4 = integrationConnectionBody.Integration_Connection_MSTR4;
            let Integration_Connection_MSTR3 = integrationConnectionBody.Integration_Connection_MSTR3;
            let Integration_Connection_MSTR2 = integrationConnectionBody.Integration_Connection_MSTR2;
            let Integration_Connection_MSTR1 = integrationConnectionBody.Integration_Connection_MSTR1;
            let Integration_Connection_SSTR5 = integrationConnectionBody.Integration_Connection_SSTR5;
            let Integration_Connection_SSTR4 = integrationConnectionBody.Integration_Connection_SSTR4;
            let Integration_Connection_SSTR3 = integrationConnectionBody.Integration_Connection_SSTR3;
            let Integration_Connection_SSTR2 = integrationConnectionBody.Integration_Connection_SSTR2;
            let Integration_Connection_SSTR1 = integrationConnectionBody.Integration_Connection_SSTR1;
            let Integration_Connection_Int5 = integrationConnectionBody.Integration_Connection_Int5;
            let Integration_Connection_Int4 = integrationConnectionBody.Integration_Connection_Int4;
            let Integration_Connection_Int3 = integrationConnectionBody.Integration_Connection_Int3;
            let Integration_Connection_Int2 = integrationConnectionBody.Integration_Connection_Int2;
            let Integration_Connection_Int1 = integrationConnectionBody.Integration_Connection_Int1;
            let params = [Integration_Connection_UID, Integration_Connection_MSTR5, Integration_Connection_MSTR4, Integration_Connection_MSTR3, 
                         Integration_Connection_MSTR2, Integration_Connection_MSTR1, Integration_Connection_SSTR5, Integration_Connection_SSTR4,
                         Integration_Connection_SSTR3, Integration_Connection_SSTR2, Integration_Connection_SSTR1, Integration_Connection_Int5,
                         Integration_Connection_Int4, Integration_Connection_Int3, Integration_Connection_Int2, Integration_Connection_Int1,
                         System_Client_UID, Integration_Connection_TypeID];
            const sp = "call AddUpdateIntegrationConnection(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            dbController.query(sp, params, (err, integrationConnection) => {
                if (err) {
                    console.log(integrationConnection);
                    return fCallBack(true, JSON.stringify({ statusCode: 500, response: integrationConnection.message }));
                } else {
                    return fCallBack(false, integrationConnection[0]);
                }
            });
        }
    });
};




module.exports = integrationConnectionController;