const database = require('../helper/database');
const path = require('path');

module.exports = {
    logIn : function(req, res, next){
        
        const nip = req.body.nip;
        const passwords = req.body.passwords;

        const valid = (
            nip == "admin"
            &&
            passwords == '12345678'
        );

        if(!valid)
        return res.send(
            `nip = ${nip},
            nip = ${passwords}`
        );

        req.session.regenerate(function(){
            req.session.user = 'admin';
            next();
        });
    },
    restrict : function (req, res, next) {
        const isAdmin = req.session.user == 'admin';
        
        if(!isAdmin)
        return res.redirect('/admin/login');
        
        next();
    },
    collectDashboardData : function (req, res, next){
        database.query(
            (
                'SELECT COUNT(*) AS total_app FROM applications;' +
                `SELECT COUNT(*) AS total_permissions FROM applications WHERE app_type='Izin Belajar';` +
                `SELECT COUNT(*) AS total_assignments FROM applications WHERE app_type='Tugas Belajar';` +
                `SELECT * FROM applications INNER JOIN employee_data ON applications.nip=employee_data.nip WHERE app_type='Tugas Belajar' ORDER BY app_date DESC LIMIT 10;` +
                `SELECT * FROM applications INNER JOIN employee_data ON applications.nip=employee_data.nip WHERE app_type='Izin Belajar' ORDER BY app_date DESC LIMIT 10;` +
                'SELECT COUNT(*) AS total_users FROM user;'
                ),
            (err ,rows, fields) => {
                
                if(err)
                return res.send(err);

                res.locals = {
                    totalApp : rows[0][0]['total_app'] ,
                    totalPermissions : rows[1][0]['total_permissions'] ,
                    totalAssignments : rows[2][0]['total_assignments'] ,
                    assignments : rows[3] ,
                    permissions : rows[4] ,
                    totalUsers : rows[5][0]['total_users']
                }
                next();
            }
        )
    },
    applications : function (req, res, next) {
        const app_type = req.params.app_type;
        console.log(
            `app_type = ${app_type}`
        );

        database.query((
            `SELECT * FROM applications INNER JOIN employee_data ON applications.nip=employee_data.nip WHERE app_type='${app_type}' ORDER BY app_date DESC;`
        ), 
        (err, rows, fields) => {
            if(err)
            return res.send(err)

            if(rows.length == 0)
            res.redirect('/admin/dashboard');

            res.locals.applications = rows;
            next()
        })
    },
    applicationsDetail : function (req, res, next){
        const app_id = req.params.app_id;

        database.query((
            `SELECT * FROM applications INNER JOIN employee_data ON applications.nip=employee_data.nip WHERE applications.app_id=${app_id};` +
            `SELECT * FROM files INNER JOIN applications ON files.app_id=applications.app_id WHERE applications.app_id=${app_id};`
        ), (err , rows , fields)=>{
            if(err)
            return res.send(err);

            res.locals = {
                applications : rows[0][0],
                files : rows[1]
            };
            next()
        })
    },
    getFiles : function (req, res, next) {
        
        const fileDir = path.resolve(`assets/private/${req.params.nip}/${req.params.app_id}/${req.params.file_name}`);

        console.log(
            `File Dir : ${fileDir}`
        );

        return res.sendFile(fileDir);
    },
    verify : function(req, res, next){

        const app_id = req.params.app_id;
        const message = req.body['notifications_message'];
        const applicationStatusExist = req.body.application_status !== undefined;
        const validFileExist = req.body.valid_file !== undefined;
        let updateFileQuery = '';
        
        if(validFileExist){
            
            let queries = '';
            const validFiles = req.body.valid_file;
            
            if( !Array.isArray(req.body.valid_file) )
            queries = req.body.valid_file;
            else
            validFiles.forEach(file => {
                queries += file;
            });     
            
            updateFileQuery = (
                `UPDATE files SET status='Valid' WHERE files_id IN ( ${queries} );`
            );
        }

        
        const appStatusQuery = (
            `UPDATE applications SET app_status='${req.body.application_status}', comment='${req.body.notifications_message}' WHERE app_id=${app_id};`
        );

        const addNotifications = (
            `INSERT INTO notifications (
                nip ,
                link ,
                content , 
                status
            ) VALUES (
                '${res.locals.applications.nip}' ,
                '/${res.locals.applications.app_type == 'Tugas Belajar' ? 'assignment' : 'permission'}/${res.locals.applications.app_id}/${res.locals.applications.last_phase}' ,
                '${message}' ,
                'unopened'
            );`
        );

        const finalQuery = updateFileQuery + appStatusQuery + addNotifications;
        console.log(
            finalQuery
        );

        database.query(
            finalQuery,
            (err, rows, fields) => {
                if(err)
                return res.send(err)
                else
                return res.redirect(`/admin/applications/${res.locals.applications.app_type}`);
            }
        )
    }
}