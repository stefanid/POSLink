var userController = {};

/******* HELPERS *******/
const dbController = require("../dblayer/dbcontroller.js");
const authenticator = require("../helpers/authenticator");



userController.register = (userData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_User_UID = null;
                let System_User_Name = userData.User_Name;
                let System_User_Email = userData.User_Email;
                let System_User_Phone = userData.User_Phone;
                let System_Site_UID = data.site_token_uid;
                let AuthServer_UID = data.user_uid;

                let params = [System_User_UID, System_User_Name, System_User_Email, System_User_Phone, System_Site_UID, AuthServer_UID];
                const sp = `call AddUpdateUser(?, ?, ?, ?, ?, ?);`
                dbController.query(sp, params, (err, user) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: user.message } }));
                    } else {
                        return fCallBack(false, user)
                    }
                });
            }
        });
};

userController.update = (userData, clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Site_UID = data.site_token_uid;
                let AuthServer_UID = data.user_uid;

                let params = [AuthServer_UID, System_Site_UID];
                const findUserQuery = `SELECT System_User_UID FROM system_user WHERE AuthServer_UID = ? AND System_Site_UID = ?`;

                dbController.query(findUserQuery, params, (err, user) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: user.message } }));
                    } else {
                        authenticator.updateInformation(userData, clientToken, fCallBack)
                            .then(function (data) {
                                if (data.statusCode == 401 || data.statusCode == 400) {
                                    return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.message }));
                                } else {
                                    let System_User_UID = user[0].System_User_UID;
                                    let System_User_Name = userData.User_Name;
                                    let System_User_Email = userData.User_Email;
                                    let System_User_Phone = userData.User_Phone;

                                    let params = [System_User_UID, System_User_Name, System_User_Email, System_User_Phone, System_Site_UID, AuthServer_UID];
                                    const sp = `call AddUpdateUser(?, ?, ?, ?, ?, ?);`
                                    dbController.query(sp, params, (err, user) => {
                                        if (err) {
                                            return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: user.message } }));
                                        } else {
                                            return fCallBack(false, user)
                                        }
                                    });
                                }
                            });
                    }
                });
            }
        });
};

userController.getRolesForUser = (clientToken, fCallBack) => {
    authenticator.validateUser(clientToken)
        .then(function (data) {
            if (data.statusCode == 401) {
                return fCallBack(true, JSON.stringify({ statusCode: data.statusCode, response: data.error.response }));
            } else {
                let System_Site_UID = data.site_token_uid;
                let AuthServer_UID = data.user_uid;
                console.log(System_Site_UID, "System_Site_UID")
                console.log(AuthServer_UID, "AuthServer_UID")
                let getRolesForUser = `SELECT ar.API_Role_Name FROM api_role as ar
                                       JOIN api_role_role_link AS arrl 
                                       ON ar.API_Role_UID = arrl.API_Role_UID
                                       JOIN role AS r
                                       ON arrl.Role_UID = r.Role_UID
                                       LEFT JOIN system_user AS su
                                       ON r.Role_UID = su.Role_UID
                                       LEFT JOIN system_client AS sc
                                       ON r.Role_UID = sc.Role_UID
                                       WHERE (su.System_Site_UID = ? AND su.AuthServer_UID = ?) 
                                       OR (sc.System_Site_UID = ? AND sc.AuthServer_UID = ?);`
                let params = [System_Site_UID, AuthServer_UID,System_Site_UID, AuthServer_UID]
                dbController.query(getRolesForUser, params, (err, roles) => {
                    if (err) {
                        return fCallBack(true, JSON.stringify({ statusCode: 500, response: { response: roles.message } }));
                    } else {
                        console.log(roles);
                        return fCallBack(false, roles)
                    }
                });
            }
        });
}



module.exports = userController;