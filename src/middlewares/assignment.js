const database = require('../helper/database');
const helper = {
    object : require('../helper/object'),
    time : require('../helper/time'),
    html : require('../helper/html')
}
const { columns } = require('../../config/config');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const object = require('../helper/object');

module.exports = {
    getAll : function(req, res, next){
        database.query(
            `SELECT * FROM application WHERE app_type='Tugas Belajar' AND nip=${req.session.user.nip}`,
            (err, row, fields) => {
                if (err)
                return res.send(err);
                else
                console.log(row[0]);
                res.locals.applications = row[0];
                next();
            }
        )
    },
    insert : function(req, res, next){
              
        let input = req.body;
      
        if( helper.object.isEmpty(input) )
        return res.send('Missing some input.');

        if(!helper.object.sameStructure(input,columns.permission))
        return res.send('Wrong Format.');

        input = object.escape(input);

        database.query(
            `INSERT INTO applications (
                nip ,
                last_phase ,
                app_status ,
                app_type ,
                app_date ,
                institution_name ,
                acreditation ,
                institution_address ,
                institution_phone_number ,
                education_level ,
                study_program ,
                major ,
                year_of_study ,
                link
            ) VALUES (
                '${req.session.user.nip}',
                '2' ,
                'Menunggu' ,
                'Tugas Belajar' ,
                '${helper.time.current_date()}',
                ${input.institution_name},
                ${input.acreditation},
                ${input.institution_address},
                ${input.institution_phone_number},
                ${input.education_level},
                ${input.study_program},
                ${input.major},
                ${input.year_of_study},
                ${input.link}
            )`, 
            (errors, results, fields) => {
                if(errors)
                return res.send(errors);
                else{
                    res.locals.applications = {};
                    res.locals.applications.app_id = results.insertId;
                    next();
                }
            }
        )
    },
    getById : function(req, res, next){
        const app_id =  database.escape(req.params.app_id);

        database.query(
            `SELECT * FROM applications WHERE nip='${req.session.user.nip}' AND app_id=${app_id}`, 
            (errors, results, fields) => {
                if(errors)
                return res.send(errors);
                else{
                    res.locals.applications = {...results[0]};
                    console.log(
                        'getByID : ' + JSON.stringify(res.locals)
                    );
                    next();
                }
            }
        )
    },
    resume :function(req, res, next){
        const last_phase = req.params.phase;

        res.render(`user/assignment-phase${last_phase}`);
    },
    restrictFile : function (req, res, next) {
        
        const appNip =  res.locals.applications.nip;
        const userNip = req.session.user.nip;
        const isAutheticated = ( appNip == userNip);

        if(!isAutheticated)
        return res.send('Unauthorized.');

        next()
    },
    upload : function (){
        
        const storage = multer.diskStorage({
            destination : function (req , file, cb){

                const user_nip = req.session.user.nip;
                const app_id = req.params.app_id;

                const dir = path.resolve(`./assets/private/${user_nip}/${app_id}`);
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
                const app_id = req.params.app_id;

                const ext = path.extname(file.originalname);
                const fileName = user_nip+'_'+app_id+'_'+file.fieldname+ext;
                cb(null, fileName)
            }
        })

        const upload = multer({storage : storage});      
        const final = upload.fields([
            { name : 'KTP' , maxCount : 1},
            { name : 'Ijazah' , maxCount : 1},
            { name : 'Transkrip' , maxCount : 1},
            { name : 'SKPNS' , maxCount : 1},
            { name : 'P2KP' , maxCount : 1},
            { name : 'SK Terakhir' , maxCount : 1}
        ]);

        return final;
    },
    getFilesData : function(req, res, next){
        
        const app_id = req.params.app_id;

        database.query(
            `SELECT * FROM files WHERE app_id=${app_id}`, 
            (errors, results, fields) => {
                if(errors)
                return res.send(errors);
                else{
                    res.locals.files = [...results];
                    console.log(
                        'getFilesData : ' + JSON.stringify(res.locals)
                    );
                    next();
                }
            }
        )
    },
    recordUploadedFile : function(req, res, next){
        
        let deleteValues = '';
        let valuesQuery = '';


        const storedFiles = {};
        res.locals.files.forEach(file => {
            console.log(
                'TESTED : ' + JSON.stringify(file)
            );
            storedFiles[file.type] = true;
        });

        console.log(
            'STORED FILES : ' + JSON.stringify(storedFiles)
        );
        
        const app_id = req.params.app_id;
        const uploadedFiles = req.files;
        
        // Check and Delete Previous Records
        for(const file in uploadedFiles){

            const isStored = storedFiles[file];
            if(isStored)
            deleteValues += ',' + `'${file}'`;
            
            valuesQuery += (`, ( '${app_id}', 'pending', '${file}' , '${uploadedFiles[file][0].filename}')`)
        }

        deleteValues = deleteValues.replace(',', '');
        valuesQuery = valuesQuery.replace(',','');
        const insertQuery = (
            `INSERT INTO files ( app_id, status, type, filename) VALUES ` + valuesQuery + ';'
        );

        let deleteQuery = (
            `DELETE FROM files WHERE app_id=${app_id} AND type IN ( ${deleteValues} )` + ';'
        );

        if(deleteValues == '')
        deleteQuery = '';
        
        console.log(
            insertQuery
        );
        console.log(
            'DELETE : ' + deleteQuery
        );

        const finalQuery = deleteQuery+insertQuery;
        
        // Insert New Records
        database.query(
            finalQuery, 
            (errors, results, fields) => {
                if(errors)
                console.log(errors);
                
                next();
            }
        )
        

    }
}