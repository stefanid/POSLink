const dbController = {};
const dbConnection = require(__dirname + "/dbconnection.js");

dbController.query = (sQuery, params, fCallback) => {
    global.gPool.getConnection(function (err, connection) {
        if (err) {
            process.exit();
            return fCallback(true, err);
        } else {
            if (params.length > 0) {
                connection.query(sQuery, params, (err, response) => {
                    console.log(params);
                    if (err) {
                        connection.release();
                        return fCallback(true, err);
                    }
                    connection.release();
                    return fCallback(false, response);
                });
            } else {
                connection.query(sQuery, (err, response) => {
                    if (err) {
                        connection.release();
                        return fCallback(true, err);
                    }
                    connection.release();
                    return fCallback(false, response);
                });
            }
        }
    });
}


module.exports = dbController;