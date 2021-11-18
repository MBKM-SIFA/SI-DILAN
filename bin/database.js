const fs = require('fs');
const database = require(`${__dirname}/../../config/database.js`);
const {isEmpty, sameStructure, merge} = require('../src/helper/object');
const helper = {
    query : require('../src/helper/query'),
    object : require('../src/helper/object')
};
const { columns } = require('../config/config');

module.exports = {
    insert : function ( table_name ){
        return (req, res, next) => {
            let data = {};
            data.nip = req.session.user.nip;
            data = helper.object.merge(data, req.body);

            if(res.locals[table_name]) // Anticipate non-POST request.
            data = helper.object.merge(data, res.locals[table_name]);

            if(isEmpty(data))
            return res.send('Missing some input.');

            if(!sameStructure(data,columns[ table_name ]))
            return res.send('Wrong data format.');

            const values = helper.query.getValuesQuery( data , table_name );
    
            database.query(
                `INSERT INTO ${ table_name } ${ values }`, 
                (errors, results, fields) => {
                    if(errors)
                    return res.send(errors);
                    else
                    next();
                }
            )
        }
    },
    update : function(table_name , user_session_key , foreign_key){
        let data = {};
            data.nip = req.session.user.nip;
            data = helper.object.merge(data, req.body);

            if(res.locals[table_name]) // Anticipate non-POST request.
            data = helper.object.merge(data, res.locals[table_name]);

            if(isEmpty(data))
            return res.send('Missing some input.');

            if(!sameStructure(data,columns[ table_name ]))
            return res.send('Wrong data format.');

            const setValues = getSetQuery( data , table_name , id);
        let query = `UPDATE employee_data 
        SET 
        name='${user.name}',
        nik='${user.nik}',
        gender='${user.gender}',
        place_of_birth='${user.place_of_birth}',
        date_of_birth='${user.date_of_birth}',
        religion='${user.religion}',
        phone='${user.phone}',
        email='${user.email}',
        age='${user.age}',
        profession_status='${user.profession_status}',
        specialization='${user.specialization}',
        last_education='${user.last_education}',
        department='${user.department}',
        ranks='${user.ranks}'
        WHERE nip='${req.session.user.nip}'`;
        // query = query.replaceAll('\n' ,'');
        // console.log(query);
        
        database.query(
            query,
            (err, rows, fields) => {
                if(err)
                return res.send(err)
                else
                next()
            }
        )
    },
    get : function (req, res, next){
        database.query(
            `SELECT * FROM employee_data WHERE nip=${req.session.user.nip}`,
            (err, row, fields) => {
                if (err)
                return res.send(err);
                else
                console.log(row[0]);
                res.locals.user = merge(res.locals.user , row[0]);
                next();
            }
        )
    }
}
