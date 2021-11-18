const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config({'path' : `${__dirname}/../../.env`})
        

async function main (){
    const conn = await mysql.createConnection({
        host     : process.env.DBhost,
        user     : process.env.DBusername,
        password : process.env.DBpassword,
        database : process.env.DBname
    });
    const [rows,fields] = await conn.query(`SELECT * FROM user WHERE nip='12345678'`)
            
            console.log(
                rows
            );
        }

        main();