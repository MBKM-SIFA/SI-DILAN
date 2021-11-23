
const database = require('../helper/database');
const helper = {
    object : require('../helper/object')
}
const { columns } = require('../../config/config');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = {
    check : function(req, res, next){
        const user_nip = req.session.user.nip;
        database.query(
            `SELECT * FROM employee_data WHERE nip=${user_nip}`,
            (errors, results, fields) => {
                if(results.length == 0)
                return res.redirect('/user/employee-data');
                else
                next();
            }
        )
    },
    insert : function(req, res, next){
        
        const user = req.body;
      
        if( helper.object.isEmpty(user) )
        return res.send('Missing some input.');

        console.log(
            user
        );

        if(!helper.object.sameStructure(user,columns.employee_data))
        return res.send('Wrong Format.');

        database.query(
            `INSERT INTO employee_data VALUES(
                '${req.session.user.nip}' 
                ,'${user.name}' 
                ,'${user.nik}' 
                ,'${user.gender}' 
                ,'${user.place_of_birth}' 
                ,'${user.date_of_birth}' 
                ,'${user.religion}' 
                ,'${user.phone}' 
                ,'${user.email}' 
                ,'${user.age}' 
                ,'Pegawai Negeri Sipil' 
                ,'${user.specialization}' 
                ,'${user.last_education}' 
                ,'${user.department}' 
                ,'${user.ranks}',
                '${user.photo}'
            )`, 
            (errors, results, fields) => {
                if(errors)
                return res.send(errors);
                else
                next();
            }
        )
    }, // Move to Authentication
    update : function(req, res, next){
        const user =  req.body;

        if( helper.object.isEmpty(user) )
        return res.send('Missing some input.');

        if(!helper.object.sameStructure(user, columns.employee_data))
        return res.send(user);

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
        photo='${user.photo}',
        ranks='${user.ranks}'
        WHERE nip='${req.session.user.nip}'`;
        
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
                
                if(row[0]==undefined)
                row[0] = {};

                res.locals.employee_data = row[0];
                next();
            }
        )
    },
    storePhoto : function (){
        const storage = multer.diskStorage({
            destination : function (req , file, cb){

                const user_nip = req.session.user.nip;

                const dir = path.resolve(`./assets/private/${user_nip}`);
                const dirExist = fs.existsSync(dir);

                console.log(
                    'DIR exist : ' + dirExist
                );

                if(!dirExist)
                fs.mkdirSync(dir, {recursive : true});

                cb(null, dir)
            },
            filename : function (req, file, cb ) {

                const user_nip = req.session.user.nip;

                const ext = path.extname(file.originalname);
                const fileName = user_nip+'_photo'+ext;
                req.body.photo = fileName;
                cb(null, fileName)
            }
        })

        const upload = multer({storage : storage});      
        const final = upload.single('photo')
        return final;
    },
    restrictFile : function (req, res, next) {
        
        const fileNip = req.params.fileName.split('_')[0];
        console.log(
            'File Nip : ' + req.params.fileName.split('_')[0]
        );
        const userNip = req.session.user.nip;
        const isAutheticated = ( photoNip == userNip);

        if(!isAutheticated)
        return res.send('Unauthorized.');

        next()
    },
    getPhoto : function (req, res, next){
        const fileName = req.params.fileName;
        const nip = req.session.user.nip;
        const dir = (
            path.resolve(`assets/private/${nip}/${fileName}`)
        );

        res.sendFile(dir);
    }
}
