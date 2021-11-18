const fs = require('fs');
const path = require('path');
const database = require(`../helper/database`);
const hash = require('pbkdf2-password')(
    require(`${__dirname}/../../config/config.js`).option
);

module.exports = {
    registerAccount : function (){
        const listOfUsers = fs.readFileSync(
            path.resolve('./src/helper/user.csv')
        ).toString().split('\r\n');
        
        listOfUsers.forEach(user => {
            user  = user.split(',');
            const nip = user[0];
            const passwords = user[1];

            console.log(user);

            hash({ password : passwords } , function (err, pass, salt, hash){
                database.query(`INSERT INTO user VALUES ( '${nip}' , '${hash}' , '${salt}');`);
            })
        }); 
    },
    getApplications : function (req, res, next){
        database.query(
            `SELECT * FROM applications WHERE nip=${req.session.user.nip}`,
            (err, row, fields) => {
                if (err)
                return res.send(err);
                else
                res.locals.applications = row;
                next();
            }
        )
    },
    getNotifications : function (req, res, next){
        const userNip = req.session.user.nip;

        const selectQuery = (
            `SELECT * FROM notifications WHERE nip=${userNip};` // Add order and Limit for future Development
        );

        const updateQuery = (
            `UPDATE notifications SET status="opened" WHERE nip=${userNip};`
        );

        const finalQuery = selectQuery + updateQuery;

        database.query(
            finalQuery,
            (err, rows, fields) => {
                if(err)
                return res.send(err);
                else{
                res.locals.notifications = rows[0]; // Array of Notifications
                next();
                }                
            }
        )
    }
}
