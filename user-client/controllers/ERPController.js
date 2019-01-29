var erpController = {};


/******* HELPERS *******/
const dbController = require("../dblayer/reportDataDbController.js");
const authenticator = require("../helpers/authenticator");

erpController.addErp = (erpData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Client_UID = erpData.System_Client_UID;
                let Client_ERPSyncCFG_UID = null;
                let Client_ERPSyncCFG_ItemID = erpData.Client_ERPSyncCFG_ItemID;
                let Client_ERPSyncCFG_AccountID = erpData.Client_ERPSyncCFG_AccountID;
                let Client_ERPSyncCFG_TypeID = erpData.Client_ERPSyncCFG_TypeID;

                let params = [System_Client_UID, Client_ERPSyncCFG_UID, Client_ERPSyncCFG_ItemID,
                    Client_ERPSyncCFG_AccountID, Client_ERPSyncCFG_TypeID];
                console.log(params)
                const sp = "call AddUpdateERP(?, ?, ?, ?, ?)";
                dbController.query(sp, params, (err, erp) => {
                    if (err) {
                        console.log(erp);
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: erp.message } }));
                    } else {
                        return fCallBack(false, erp[0]);
                    }
                });
            }
        });
};

erpController.loadData = (erpData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let POS_Report_Header_UID = erpData.POS_Report_Header_UID;
                let System_Client_UID = erpData.System_Client_UID;

                const getSyncDataQuery = `SELECT client_erpsynccfg.Client_ERPSyncCFG_AccountID, pos_report_data.POS_Report_Data_ItemName, 
                CASE client_erpsynccfg.Client_ERPSyncCFG_CalcTypeID WHEN 1 THEN (pos_report_data.POS_Report_Data_Amount * -1) 
                ELSE pos_report_data.POS_Report_Data_Amount END AS ReportData_Amt, pos_report_data.POS_Report_Data_UID 
                FROM client_erpsynccfg INNER JOIN pos_report_data ON client_erpsynccfg.Client_ERPSyncCFG_ItemID = pos_report_data.POS_Report_Data_ItemNr 
                AND client_erpsynccfg.Client_ERPSyncCFG_TypeID = pos_report_data.POS_Report_Data_TypeID 
                WHERE (pos_report_data.POS_Report_Header_UID = ?)
                AND (client_erpsynccfg.System_Client_UID = ?)                
                AND POS_Report_Data_Amount <> 0`

                let params = [POS_Report_Header_UID, System_Client_UID];
                dbController.query(getSyncDataQuery, params, (err, syncData) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: syncData.message } }));
                    } else {
                        console.log(syncData);
                        for (let i = 0; i < syncData.length; i++) {

                            syncData[i].ReportData_Amt = syncData[i].ReportData_Amt.toFixed(2);
                            console.log(syncData[i].ReportData_Amt)

                        }
                        return fCallBack(false, syncData);
                    }
                });
            }
        });

};

erpController.loadHeaders = (erpData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Client_UID = erpData;
                const getHeadersQuery = `SELECT POS_Report_Header_UID, POS_Report_Header_Number 
                                         FROM pos_report_header WHERE System_Client_UID = ? AND POS_Report_Header_StatusID = 10`;
                let params = [System_Client_UID];
                dbController.query(getHeadersQuery, params, (err, headers) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: headers.message } }));
                    } else {
                        console.log(headers);
                        return fCallBack(false, headers);
                    }
                });
            }
        });
}

erpController.getReportData = (erpData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let POS_Report_Header_UID = erpData.POS_Report_Header_UID;
                let POS_Report_Data_TypeID = erpData.POS_Report_Data_TypeID;
                let System_Client_UID = erpData.System_Client_UID;
                const getReportDataQuery = `SELECT POS_Report_Data_ItemName, POS_Report_Data_ItemNr FROM pos_report_data as prd
                                            INNER JOIN pos_report_header as prh
                                            on prd.POS_Report_Header_UID = prh.POS_Report_Header_UID
                                            WHERE prh.POS_Report_Header_UID = ?
                                            AND prd.POS_Report_Data_TypeID = ? 
                                            AND prh.System_Client_UID = ?
                                            AND prd.POS_Report_Data_Amount <> 0
                                            AND prh.POS_Report_Header_StatusID = 10`;
                let params = [POS_Report_Header_UID, POS_Report_Data_TypeID, System_Client_UID];
                dbController.query(getReportDataQuery, params, (err, reportData) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: reportData.message } }));
                    } else {
                        console.log(reportData);
                        return fCallBack(false, reportData);
                    }
                });
            }
        });
}

erpController.getReportDataTypes = (erpData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let POS_Report_Header_UID = erpData.POS_Report_Header_UID;
                const getReportDataTypeQuery = `SELECT DISTINCT POS_Report_Data_TypeID FROM pos_report_data WHERE POS_Report_Header_UID = ? `;
                let params = [POS_Report_Header_UID];
                dbController.query(getReportDataTypeQuery, params, (err, reportDataType) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: reportDataType.message } }));
                    } else {
                        console.log(reportDataType);
                        return fCallBack(false, reportDataType);
                    }
                });

            }
        });

}

module.exports = erpController;