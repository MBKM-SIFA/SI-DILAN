const router = require('express').Router();
const path = require('path');
const middlewares = {
    auth : require('../middlewares/auth'),
    employee : require('../middlewares/employee'),
    response : require('../middlewares/response'),
    user : require('../middlewares/user')
}

router
.get(
    '/register', [
        middlewares.user.registerAccount
    ]
)
.get(
    '/home',[
        middlewares.auth.restrict,
        middlewares.response.render('user/beranda.ejs')
    ]
    )
    .get(
        '/employee-data',
        [
            middlewares.auth.restrict,
            middlewares.employee.get,
            middlewares.response.render('user/employee-form.ejs')
    ]
)
.get(
    '/applications',
    middlewares.auth.restrict,
    middlewares.user.getApplications,
    middlewares.response.render('user/applications-list.ejs')
)
.get(
    '/photo/:fileName',
    middlewares.employee.getPhoto
)
.get(
    '/notifications',
    middlewares.user.getNotifications,
    middlewares.response.render('user/notifikasi')
)
.post(
    '/post-employee-data',
    [
        middlewares.auth.restrict,
        middlewares.employee.storePhoto(),
        middlewares.employee.insert,
        middlewares.response.redirect('/user/home')
    ]
    )
    .post(
        '/update-employee-data',
        [
        middlewares.auth.restrict,
        middlewares.employee.storePhoto(),
        middlewares.employee.update,
        middlewares.response.redirect('/user/employee-data')
    ]
)
module.exports = router;