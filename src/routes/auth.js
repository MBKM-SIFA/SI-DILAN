const router = require('express').Router();
const path = require('path');
const middlewares = {
    auth : require('../middlewares/auth'),
    user : require('../middlewares/user'),
    employee : require('../middlewares/employee'),
    response : require('../middlewares/response')
}

router
.post(
    '/login' ,[
        middlewares.auth.login,
        middlewares.employee.check,
        middlewares.response.redirect('/user/home')
    ]
)
.get(
    '/login' , 
        middlewares.response.render('user/login.ejs')
)
.get(
    '/logout' ,
        middlewares.auth.logout
);


module.exports = router;