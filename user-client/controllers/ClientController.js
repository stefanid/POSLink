var clientController = {};

/******* HELPERS *******/
const dbController = require("../dblayer/dbcontroller.js");
const authenticator = require("../helpers/authenticator");


clientController.addClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Client_UID = null;
                let System_Client_PUID = clientData.Client_PUID;
                let System_Client_Name = clientData.Client_Name;
                let System_Client_Adr1 = clientData.Client_Adr1;
                let System_Client_Adr2 = clientData.Client_Adr2;
                let System_Client_Adr3 = clientData.Client_Adr3;
                let System_Client_PostalCode = clientData.Client_PostalCode;
                let System_Client_City = clientData.Client_City;
                let Utility_Country_UID = clientData.Country_UID;
                let System_Client_VAT = clientData.Client_VAT;
                let System_Client_EAN = clientData.System_Client_EAN;
                let System_Client_TypeID = 10;
                let System_Client_InvoiceEmail = clientData.Client_InvoiceEmail;
                let System_Client_StatusID = 10;
                let params = [System_Client_UID, System_Client_PUID, System_Client_Name,
                    System_Client_Adr1, System_Client_Adr2, System_Client_Adr3,
                    System_Client_PostalCode, System_Client_City,
                    Utility_Country_UID, System_Client_VAT, System_Client_EAN,
                    System_Client_TypeID, System_Client_InvoiceEmail, System_Client_StatusID];

                const sp = "call AddUpdateClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                dbController.query(sp, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        return fCallBack(false, client[0]);
                    }
                });
            }
        });
};

clientController.updateClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Client_UID = clientData.Client_UID;
                let System_Client_PUID = clientData.Client_PUID;
                let System_Client_Name = clientData.Client_Name;
                let System_Client_Adr1 = clientData.Client_Adr1;
                let System_Client_Adr2 = clientData.Client_Adr2;
                let System_Client_Adr3 = clientData.Client_Adr3;
                let System_Client_PostalCode = clientData.Client_PostalCode;
                let System_Client_City = clientData.Client_City;
                let Utility_Country_UID = clientData.Country_UID;
                let System_Client_VAT = clientData.Client_VAT;
                let System_Client_EAN = clientData.System_Client_EAN;
                let System_Client_TypeID = 10;
                let System_Client_InvoiceEmail = clientData.Client_InvoiceEmail;
                let System_Client_StatusID = 10;
                let params = [System_Client_UID, System_Client_PUID, System_Client_Name,
                    System_Client_Adr1, System_Client_Adr2, System_Client_Adr3,
                    System_Client_PostalCode, System_Client_City,
                    Utility_Country_UID, System_Client_VAT, System_Client_EAN,
                    System_Client_TypeID, System_Client_InvoiceEmail, System_Client_StatusID];

                const sp = "call AddUpdateClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                dbController.query(sp, params, (err, client) => {
                    if (err) {
                        console.log(client);
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        console.log(client);
                        return fCallBack(false, client);
                    }
                });
            }
        });
};

clientController.getClient = (Client_UID, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                params = [Client_UID];
                const getClientQuery = `SELECT * FROM system_client WHERE System_Client_UID = ?`;
                dbController.query(getClientQuery, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        return fCallBack(false, client[0]);
                    }
                });

            }
        });
};

clientController.disableClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let params = [clientData.Client_UID];
                const getClientQuery = `UPDATE system_client 
                                        SET System_Client_StatusID = 90
                                        WHERE System_Client_UID = ?`;
                dbController.query(getClientQuery, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        return fCallBack(false, client[0]);
                    }
                });

            }
        });
};

clientController.administrateClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.message }));
            } else {
                let System_Client_Admin_UID = null;
                let System_Client_UID = clientData.Client_UID
                let params = [System_Client_Admin_UID, System_Client_UID];
                let sp = `call AddClientAdmin(?, ?)`;
                dbController.query(getClientQuery, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        return fCallBack(false, client[0]);
                    }
                });

            }
        });
};

clientController.getClients = (status, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                console.log(data.error);
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                var optionalStatus = '';
                let AuthServer_UID = data.user_uid;
                if (status) {
                    optionalStatus = 'AND sc.System_Client_StatusID = ' + status;
                }
                console.log(optionalStatus);
                let getClientsQuery = `SELECT sc.System_Client_UID ,sc.System_Client_ID, sc.System_Client_Name,  
                                       coalesce(sc.System_Client_Adr1,'-') AS System_Client_Adr1,
                                       coalesce(sc.System_Client_Adr2,'-') AS System_Client_Adr2,
                                       coalesce(sc.System_Client_Adr3,'-') AS System_Client_Adr3,
                                       sc.Utility_Country_UID, sc.System_Client_City, 
                                       sc.System_Client_VAT, sc.System_Client_EAN, 
                                       sc.System_Client_PostalCode, sc.System_Client_InvoiceEmail,
                                       sc.System_Client_PUID, sc.System_Client_StatusID, 
                                       COALESCE(scp.System_Client_Name,'-') AS 'Parent_Name'
                                       FROM system_client AS sc
                                       JOIN system_client_user AS scu 
                                       ON sc.System_Client_UID = scu.System_Client_UID
                                       JOIN system_user AS su 
                                       ON su.System_User_UID = scu.System_User_UID
                                       LEFT JOIN system_client AS scp
                                       ON sc.System_Client_PUID = scp.System_Client_UID
                                       WHERE su.AuthServer_UID = ? ${optionalStatus} ORDER BY sc.System_Client_Name DESC`;
                let params = [AuthServer_UID];
                dbController.query(getClientsQuery, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        for (let i = 0; i < client.length; i++) {
                            const element = client[i];
                            if (element.System_Client_StatusID == 10) {
                                element.System_Client_Status = 'Active';
                            }
                            else {
                                element.System_Client_Status = 'Disabled';
                            }
                        }
                        return fCallBack(false, client);
                    }
                });

            }
        });
};

clientController.authenticateClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.message }));
            } else {
                let AuthServer_UID = data.user_uid;

                let findUserQuery = `SELECT System_User_UID FROM system_user WHERE AuthServer_UID = ?`;
                let params = [AuthServer_UID];

                dbController.query(findUserQuery, params, (err, user) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: user.message } }));
                    } else {
                        let sp = "call AddClientUser(?, ?, ?);";
                        let System_Client_User_UID = null;
                        let System_Client_UID = clientData.Client_UID;
                        let System_User_UID = user[0].System_User_UID;
                        let params = [System_Client_User_UID, System_Client_UID, System_User_UID];
                        dbController.query(sp, params, (err, clientUser) => {
                            if (err) {
                                return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: user.message } }));
                            } else {
                                return fCallBack(false, clientUser[0]);
                            }
                        });
                    }
                });
            }
        });
};

clientController.activateClient = (clientData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let params = [clientData.Client_UID];
                const getClientQuery = `UPDATE system_client 
                                    SET System_Client_StatusID = 10
                                    WHERE System_Client_UID = ?`;
                dbController.query(getClientQuery, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        return fCallBack(false, client[0]);
                    }
                });

            }
        });
};

clientController.getChildClients = (clientToken, Client_UID, fCallBack) => {
    console.log(Client_UID);
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                var additionalParams = '';
                if (Client_UID) {
                    additionalParams = ` AND System_Client_UID != ?`;

                }
                let params = [Client_UID];
                const getChildClients = `SELECT System_Client_UID, System_Client_Name FROM system_client WHERE System_Client_PUID IS NULL ${additionalParams}`;
                dbController.query(getChildClients, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        console.log(client);
                        return fCallBack(false, client);
                    }
                });

            }
        });
};

clientController.getChildClientsOfParent = (clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let AuthServer_UID = data.user_uid;
                const getClientUID = `SELECT System_Client_UID FROM system_client WHERE AuthServer_UID = ?`;
                let params = [AuthServer_UID];
                dbController.query(getClientUID, params, (err, client) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: client.message } }));
                    } else {
                        let System_Client_UID = client[0].System_Client_UID;
                        console.log('xx', System_Client_UID);
                        const getChildClients = `SELECT child.System_Client_UID ,child.System_Client_ID, child.System_Client_Name,  
                                                coalesce(child.System_Client_Adr1,'-') AS System_Client_Adr1,
                                                coalesce(child.System_Client_Adr2,'-') AS System_Client_Adr2,
                                                coalesce(child.System_Client_Adr3,'-') AS System_Client_Adr3,
                                                child.Utility_Country_UID, child.System_Client_City, 
                                                child.System_Client_VAT, child.System_Client_EAN, 
                                                child.System_Client_PostalCode, child.System_Client_InvoiceEmail,
                                                child.System_Client_PUID, child.System_Client_StatusID,
                                                COALESCE(childOfChildParent.System_Client_Name, '-') AS 'Parent_Name' 
                                                FROM system_client AS child 
                                                INNER JOIN system_client AS parent
                                                ON child.System_Client_PUID = parent.System_Client_UID
                                                LEFT JOIN system_client AS childOfChildParent ON
                                                childOfChildParent.System_Client_PUID = child.System_Client_UID 
                                                WHERE parent.System_Client_UID = ?;`;
                        let params = [System_Client_UID];
                        dbController.query(getChildClients, params, (err, clients) => {
                            if (err) {
                                return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: clients.message } }));
                            } else {
                                for (let i = 0; i < clients.length; i++) {
                                    const element = clients[i];
                                    if (element.System_Client_StatusID == 10) {
                                        element.System_Client_Status = 'Active';
                                    }
                                    else {
                                        element.System_Client_Status = 'Disabled';
                                    }
                                }
                                return fCallBack(false, clients);
                            }
                        });
                    }
                });
            }
        });
};


module.exports = clientController;