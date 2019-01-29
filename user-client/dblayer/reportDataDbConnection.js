const mysql = require("mysql");
const config = require("../appSettings.json");
global.gPoolData = null;

const host = config.report_data.host;
const user = config.report_data.user;
const password = config.report_data.password;
const database = config.report_data.database;

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});

global.gPoolData = pool;