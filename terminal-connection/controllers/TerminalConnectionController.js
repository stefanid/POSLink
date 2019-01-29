var terminalConnectionController = {};
/******* PACKAGES *******/
const fs = require("fs");
const zipdir = require('zip-dir');
/******* HELPERS *******/
const dbController = require("../dblayer/dbcontroller.js");
const authenticator = require("../helpers/authenticator");
const fileService = require("../helpers/fileService.js");



terminalConnectionController.updateTerminalConnection = (terminalConnectionData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_Connection_UID = terminalConnectionData.Terminal_Connection_UID;
                let System_Client_UID;
                let Terminal_UID;
                let Terminal_Connection_Username = terminalConnectionData.Terminal_Connection_Username;
                let Terminal_Connection_Password = terminalConnectionData.Terminal_Connection_Password;
                let Terminal_Connection_TypeID;


                let params = [Terminal_Connection_UID, System_Client_UID, Terminal_UID, Terminal_Connection_Username, Terminal_Connection_Password, Terminal_Connection_TypeID];
                const sp = "call AddUpdateTerminalConnection(?, ?, ?, ?, ?, ?)";

                dbController.query(sp, params, (err, terminalConnection) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminalConnection.message }));
                    } else {
                        return fCallback(false, terminalConnection[0]);
                    }
                });
            }
        });
};

terminalConnectionController.getTerminalConnection = (terminalConnectionData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_UID = terminalConnectionData.Terminal_UID;
                let params = [Terminal_UID];
                const getTerminalQuery = `SELECT t.Terminal_Name, tc.Terminal_Connection_UID, tc.System_Client_UID, 
                                          tc.Terminal_Connection_Username, tc.Terminal_Connection_CreateDate, 
                                          coalesce(tc.Terminal_Connection_LastSync, '-') AS Terminal_Connection_LastSync,
                                          tc.Terminal_Connection_LastUpdated
                                          FROM terminal_connection AS tc
                                          JOIN terminal AS t
                                          ON tc.Terminal_UID = t.Terminal_UID
                                          WHERE tc.Terminal_UID = ? 
                                          AND Terminal_Connection_StatusID = 10`;

                dbController.query(getTerminalQuery, params, (err, terminalConnection) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminalConnection.message }));
                    } else {
                        return fCallback(false, terminalConnection);

                    }
                });
            }
        });
};

terminalConnectionController.distableTerminal = (terminalConnectionData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let Terminal_Connection_UID = terminalConnectionData.Terminal_Connection_UID;
                let params = [Terminal_Connection_UID];
                const deleteTerminalQuery = `UPDATE terminal_connection 
                                          SET Terminal_Connection_StatusID = 90 
                                          WHERE Terminal_Connection_UID = ?`;
                dbController.query(deleteTerminalQuery, params, (err, terminalConnection) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminalConnection.message }));
                    } else {
                        if (err) {
                            return fCallback(true, JSON.stringify({ statusCode: 500, response: terminalConnection.message }));
                        } else {
                            return fCallback(false, terminalConnection);
                        }
                    }
                });
            }
        });
};

terminalConnectionController.generateConfigFile = (terminalConnectionData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let findLatestUsernameQuery = `SELECT * FROM terminal_connection WHERE
                                               terminal_connection.Terminal_Connection_CreateDate IN 
                                               (SELECT  terminal_connection.Terminal_Connection_CreateDate WHERE 
                                               terminal_connection.Terminal_Connection_CreateDate = (SELECT MAX( terminal_connection.Terminal_Connection_CreateDate) 
                                               FROM terminal_connection))`;

                dbController.query(findLatestUsernameQuery, (err, foundTerminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminal.message }));
                    } else {
                        let Terminal_Connection_Username = foundTerminal[0].Terminal_Connection_Username;
                        let newTerminalUsername = Terminal_Connection_Username.split('LP00').pop();
                        var increment = parseInt(newTerminalUsername) + 1;
                        var New_Terminal_Connection_Username = Terminal_Connection_Username.substring(0, 4) + increment;
                        var Terminal_Connection_Password = Math.random().toString(36).slice(-8);

                        fs.readFile("./configfile.sql", "utf8", function (err, file) {
                            if (err) {
                                return fCallback(true, JSON.stringify({ statusCode: 500, response: err }));
                            } else {
                                file = file.replace(/LP001007/g, New_Terminal_Connection_Username);
                                file = file.replace(/700100PL/g, Terminal_Connection_Password);
                                var fileBuffer = Buffer.from(file);

                                let Terminal_Connection_UID = null;
                                let System_Client_UID = terminalConnectionData.Client_UID;
                                let Terminal_UID = terminalConnectionData.Terminal_UID;
                                let Terminal_Connection_Username = New_Terminal_Connection_Username;
                                let Terminal_Connection_TypeID = 10;

                                const sp = "call AddUpdateTerminalConnection(?, ?, ?, ?, ?, ?)";
                                let params = [Terminal_Connection_UID, System_Client_UID, Terminal_UID,
                                    Terminal_Connection_Username, Terminal_Connection_Password, Terminal_Connection_TypeID];
                                dbController.query(sp, params, (err, terminalConnection) => {
                                    if (err) {
                                        return fCallback(true, JSON.stringify({ statusCode: 500, response: terminalConnection.message }));
                                    } else {
                                        var path = "./APK_template_Files/dtex_setup.sql"
                                        let buffer = new Buffer(fileBuffer);
                                        var stream = fs.appendFile(path, file, function (err) {

                                            if (err) {
                                                return fCallback(true, JSON.stringify({ statusCode: 500, response: { response: err } }));
                                            } else {
                                                zipdir('./APK_template_Files', { saveTo: './APK_template_Files/config.zip' }, function (err, buffer) {
                                                    if (err) {
                                                        console.log(err);
                                                        return fCallback(true, JSON.stringify({ statusCode: 500, response: { response: err } }));
                                                    } else {
                                                        console.log("success");
                                                        let configZipPath = './APK_template_Files/config.zip';
                                                        let pathObj = JSON.stringify({ rootPath: path, configPath: configZipPath });
                                                        return fCallback(false, pathObj);
                                                    }
                                                });

                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });

};


terminalConnectionController.downloadConfig = (terminalConnectionData, clientToken, fCallback) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallback(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                console.log(terminalConnectionData)
                let findTerminal = `SELECT Terminal_Connection_Username, Terminal_Connection_Password 
                                    FROM terminal_connection WHERE
                                    Terminal_UID = ?`;
                let Terminal_UID = terminalConnectionData.Terminal_UID;
                let params = [Terminal_UID];
                dbController.query(findTerminal, params, (err, foundTerminal) => {
                    if (err) {
                        return fCallback(true, JSON.stringify({ statusCode: 500, response: foundTerminal.message }));
                    } else {
                        console.log(foundTerminal[0]);
                        let Terminal_Connection_Username = foundTerminal[0].Terminal_Connection_Username;
                        let Terminal_Connection_Password = foundTerminal[0].Terminal_Connection_Password;
                        fs.readFile("./configfile.sql", "utf8", function (err, file) {
                            if (err) {
                                return fCallback(true, JSON.stringify({ statusCode: 500, response: err }));
                            } else {
                                file = file.replace(/LP001007/g, Terminal_Connection_Username);
                                file = file.replace(/700100PL/g, Terminal_Connection_Password);
                                var fileBuffer = Buffer.from(file);

                                var path = "./APK_template_Files/dtex_setup.sql"
                                let buffer = new Buffer(fileBuffer);
                                var stream = fs.appendFile(path, file, function (err) {

                                    if (err) {
                                        return fCallback(true, JSON.stringify({ statusCode: 500, response: { response: err } }));
                                    } else {
                                        zipdir('./APK_template_Files', { saveTo: './APK_template_Files/config.zip' }, function (err, buffer) {
                                            if (err) {
                                                console.log(err);
                                                return fCallback(true, JSON.stringify({ statusCode: 500, response: { response: err } }));
                                            } else {
                                                console.log("success");
                                                let configZipPath = './APK_template_Files/config.zip';
                                                let pathObj = JSON.stringify({ rootPath: path, configPath: configZipPath });
                                                return fCallback(false, pathObj);
                                            }
                                        });

                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
}
module.exports = terminalConnectionController;

