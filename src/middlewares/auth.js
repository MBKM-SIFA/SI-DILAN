const database = require('../helper/database');
const hash = require('pbkdf2-password')(
    require(`${__dirname}/../../config/config.js`).option
);
const path = require('path');

module.exports = {
    login : function (req, res, next){

        const nip = req.body.nip;
        const passwords = req.body.passwords;

        if (nip=="" | passwords=="")
            return res.send('Request Empty');
        
        database.query(
            `SELECT * FROM user WHERE nip=${nip}`,
            (errors, user, fields) => {

                console.log(user);
                
                if(user == undefined || user.length == 0)
                return res.redirect('/auth/login');
                
                hash({ password : passwords, salt : user[0].salt },function (err, pass , salt, hash){
                    if(err) return res.send(err);
                    
                    
                    if(hash == user[0].hash)
                    req.session.regenerate(function(){
                        req.session.user = user[0];
                        next();
                    });
                    else
                    return res.redirect('/auth/login');
                })
            })

    },
    logout : function (req, res, next) {
        
        req.session.destroy(()=>{
            res.redirect('/auth/login')
        })

    },
    restrict : function(req, res, next){
        if(req.session.user)
        next();
        else
        return res.redirect('/auth/login');
    },
}