const database = require('../helper/database');
const { columns } = require('../../config/config');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const helper = {
    time : require('../helper/time')
};


module.exports = {
    storePhoto : function (){

        const storage = multer.diskStorage({
            destination : function (req , file, cb){

                const dir = path.resolve(`./assets/public`);
                const dirExist = fs.existsSync(dir);

                console.log(
                    'DIR exist : ' + dirExist
                );

                if(!dirExist)
                fs.mkdirSync(dir, {recursive : true});

                cb(null, dir)
            },
            filename : function (req, file, cb ) {
                const fileName = file.originalname;
                req.params.fileName = fileName;
                cb(null, fileName)
            }
        })

        const upload = multer({storage : storage});      
        const final = upload.single('photo')
        return final;
    },
    recordsFileName : function (req, res, next){
        
        const articlesID = req.params.articlesID;
        const fileName  = req.params.fileName;

        const query = (
            `UPDATE posts SET photo='${fileName}' WHERE post_id=${articlesID};`
        );

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
    getAll : function (req, res, next){
        const query = (
            'SELECT * FROM posts;'
        );
        database.query(
            query,
            (err, rows, fields) => {
                if(err)
                return res.send(err);
                else{
                    res.locals.posts = rows;
                    next();
                }
            }
        )
    },
    insert : function (req, res ,next){
        const input = req.body;
        console.log(JSON.stringify(input));

        const query = (
            `INSERT INTO posts (
                link ,
                study_program ,
                open_date ,
                close_date ,
                acreditation ,
                post_date ,
                institute
            ) VALUES (
                '${input.link}' ,
                '${input.study_program}' ,
                '${input.open_date}' ,
                '${input.close_date}' ,
                '${input.acreditation}' ,
                '${helper.time.current_date()}' ,
                '${input.institute}'
            );`
        );

        database.query(
            query,
            (err, rows, fields) => {
                if(err)
                return res.send(err);
                else{
                    req.params.articlesID = rows.insertId;
                    next();
                }
            }
        )


    },
    update : function (req, res, next){
        const post_id = req.params.post_id;

        const query = (
            `SELECT * FROM posts WHERE post_id=${post_id};`
        );

        database.query(
            query,
            (err, rows, fields) => {
                if(err)
                return res.send(err);
                else{
                    res.locals.posts = rows[0];
                    next();
                }
            }
        );
    },
    updateById : function (req, res, next){
        const post_id = req.params.post_id;
        const input = req.body;
        const fileName  = req.params.fileName;
        
        const query = (
            `UPDATE posts SET 
            SET
            post_type='${input.post_type}' ,
                title='${input.title}' ,
                link='${input.link}' ,
                photo='${fileName}' ,
                study_program='${input.study_program}' ,
                open_date='${input.open_date}' ,
                close_date='${input.close_date}' ,
                acreditation='${input.acreditation}' ,  
            WHERE post_id=${post_id};`
        );

        database.query(
            query,
            (err, rows, fields) => {
                if(err)
                return res.send(err);
                else{
                    console.log(rows);
                    res.locals.posts = rows;
                    next();
                }
            }
        );
    },
    delete : function (req, res, next){
        const post_id = req.params.post_id;

        const query = (
            `DELETE FROM posts WHERE post_id=${post_id};`
        );

        database.query(
            query,
            (err , rows , fields) => {
                if(err)
                return res.send(err);
                else
                next();
            }
        );
    },
    getPosts : function (req, res, next){

        const query = (
            `SELECT * FROM posts ORDER BY post_date DESC LIMIT 4;`
        );

        database.query(
            query,
            ( err, rows, fields ) => {
                if(err)
                return res.send(err);
                else{
                    res.locals.posts = rows;
                    next();
                }
            }
        )
    }
}