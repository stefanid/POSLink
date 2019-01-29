const mysql = require("mysql");
const config = require("../appSettings.json");
global.gPool = null;

const host = config.dbConnection.host;
const user = config.dbConnection.user;
const password = config.dbConnection.password;
const database = config.dbConnection.database;

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});

global.gPool = pool;