const mysql = require('mysql2');
const fs = require('fs');

const database = mysql.createConnection(
    {
        host     : '127.0.0.1',
        user     : 'siDilanUser',
        password : '12345678',
        database : 'siDilan',
        port : '3306',
        multipleStatements : true
    }
)
const query = fs.readFileSync('./query.sql').toString();

database.query(
    query,
    (err) => {
        if(err) console.log(err);
    }
);