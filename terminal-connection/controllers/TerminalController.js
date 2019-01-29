var terminalController = {};


/******* HELPERS *******/
const dbController = require("../dblayer/dbcontroller.js");
const authenticator = require("../helpers/authenticator");


terminalController.addTerminal = (terminalData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_UID = null;
                let System_Client_UID = terminalData.Client_UID;
                let Terminal_Name = terminalData.Terminal_Name;
                let Terminal_TypeID = terminalData.Terminal_TypeID;
                console.log("terminalData", terminalData.Terminal_TypeID);
                let params = [Terminal_UID, System_Client_UID, Terminal_Name, Terminal_TypeID];
                const sp = "call AddUpdateTerminal(?, ?, ?, ?)";

                dbController.query(sp, params, (err, terminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        return fCallback(false, terminal[0]);
                    }
                });
            }
        });
};

terminalController.updateTerminal = (terminalData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_UID = terminalData.Terminal_UID;
                let System_Client_UID = terminalData.Client_UID;
                let Terminal_Name = terminalData.Terminal_Name;
                let Terminal_TypeID = terminalData.Terminal_TypeID;
                console.log("terminalData", terminalData.Terminal_TypeID);
                let params = [Terminal_UID, System_Client_UID, Terminal_Name, Terminal_TypeID];
                const sp = "call AddUpdateTerminal(?, ?, ?, ?)";

                dbController.query(sp, params, (err, terminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        return fCallback(false, terminal[0]);
                    }
                });
            }
        });
};

terminalController.getTerminal = (terminalData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_UID = terminalData.Terminal_UID;
                let params = [Terminal_UID];
                const sp = "SELECT * FROM terminal WHERE Terminal_UID = ? AND Terminal_StatusID = 10";
                dbController.query(sp, params, (err, terminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        return fCallback(false, terminal[0]);
                    }
                });
            }
        });
};

terminalController.getAllTerminals = (clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.message }));
            } else {
                const sp = "SELECT * FROM terminal WHERE Terminal_StatusID = 10";
                dbController.query(sp, (err, terminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        return fCallback(false, terminal);
                    }
                });
            }
        });
};

terminalController.getByClientUID = (terminalData, clientToken, fCallback) => {
    console.log("terminalData", terminalData)
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                var terminals = [];
                const sp = `SELECT t.Terminal_UID, t.System_Client_UID,
                t.Terminal_Name, t.Terminal_TypeID, t.Terminal_StatusID, 
                coalesce(t.Terminal_CreateDate, '-')  AS Terminal_CreateDate,
                coalesce(tc.Terminal_Connection_LastSync, '-') AS Terminal_Connection_LastSync
                FROM terminal AS t 
                LEFT JOIN terminal_connection AS tc
                ON t.Terminal_UID = tc.Terminal_UID
                WHERE t.System_Client_UID = ? 
                AND t.Terminal_StatusID = 10 ORDER BY t.Terminal_CreateDate`;
                if (terminalData !== undefined) {

                    if (Array.isArray(terminalData)) {


                        var pending = terminalData.length;

                        for (let i = 0; i < terminalData.length; i++) {

                            let params = [terminalData[i]];
                            dbController.query(sp, params, (err, terminal) => {
                                if (err) {
                                    return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                                } else {
                                    for (let x = 0; x < terminal.length; x++) {
                                        terminals.push(terminal[x]);

                                    }

                                    if (0 === --pending) {
                                        for (let i = 0; i < terminals.length; i++) {
                                            if (terminals[i]) {
                                                if (terminals[i].Terminal_TypeID == 10) {
                                                    terminals[i].Type = "Casio-Android";
                                                } else if (terminals[i].Terminal_TypeID == 20) {
                                                    terminals[i].Type = "Casio-qtxxxx";
                                                } else if (terminals[i].Terminal_TypeID == 30) {
                                                    terminals[i].Type = "TwinPOS";
                                                }
                                            }
                                        }
                                        return fCallback(false, terminals);
                                    }
                                }
                            });
                        }

                    } else {
                        console.log(" IM NOT ARRAY")
                        let params = [terminalData];
                        dbController.query(sp, params, (err, terminal) => {
                            if (err) {
                                return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                            } else {
                                for (let i = 0; i < terminal.length; i++) {
                                    terminals.push(terminal[i])

                                }

                                for (let i = 0; i < terminals.length; i++) {
                                    if (terminals[i]) {
                                        if (terminals[i].Terminal_TypeID == 10) {
                                            terminals[i].Type = "Casio-Android";
                                        } else if (terminals[i].Terminal_TypeID == 20) {
                                            terminals[i].Type = "Casio-qtxxxx";
                                        } else if (terminals[i].Terminal_TypeID == 30) {
                                            terminals[i].Type = "TwinPOS";
                                        }
                                    }
                                }
                                console.log('db', terminals);
                                return fCallback(false, terminals);

                            }
                        });
                    }

                }


            }
        });
};

terminalController.disableTerminal = (terminalData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_UID = terminalData.Terminal_UID;
                let params = [Terminal_UID];
                const sp = "UPDATE terminal SET Terminal_StatusID = 90 WHERE Terminal_UID = ?";
                dbController.query(sp, params, (err, terminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        return fCallback(false, terminal);
                    }
                });
            }
        });
};


module.exports = terminalController;