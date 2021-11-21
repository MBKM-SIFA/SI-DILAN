const express = require('express');
const app = express();
const path = require('path');

// Session Configuration
const session = require('express-session');
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'test'
}));

// .env processing
require('dotenv').config({'path' : './config/.env'})

// EJS Configuration
app.set('view engine','ejs');
app.set('views',path.resolve('./src/views'))

// Req Body Parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listener
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening to ${process.env.PORT | '3000'} ...`);
})
app.use(
    (req,res,next)=>{
        res.locals.user = req.session.user;
        next();
    }
)

// Setting Routes.
app.use(
    '/user' ,
    require('./src/routes/user')
)
app.use(
    '/auth' ,
    require('./src/routes/auth')
)
app.use(
    '/permission' ,
    require('./src/routes/permission')
)
app.use(
    '/assignment' ,
    require('./src/routes/assignment')
)
app.use(
    '/admin',
    require('./src/routes/admin')   
)
app.use(
    '/posts' ,
    require('./src/routes/posts')
)
app.use(
    '/public' ,
    express.static('./assets/public')
)
app.use((req,res) => res.send('NOT FOUND'))