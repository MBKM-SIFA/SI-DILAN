const mysql = require('mysql2');
const path = require('path');
const config = require(path.resolve('config/config'));    

const connection = mysql.createConnection(
    config.database
);

module.exports = connection;