const route = require('express').Router();
const middlewares = {
    response : require('../middlewares/response'),
    admin : require('../middlewares/admin')
};

route.get(
    '/logIn',
    middlewares.response.render('admin/logIn')
)

route.post(
    '/logIn',
    middlewares.admin.logIn,
    middlewares.response.redirect('/admin/dashboard')
)

route.get(
    '/dashboard',
    middlewares.admin.restrict,
    middlewares.admin.collectDashboardData,
    middlewares.response.render('admin/dashboard')
)

route.get(
    '/applications/:app_type',
    middlewares.admin.restrict,
    middlewares.admin.applications,
    middlewares.response.render('admin/applications')
    )
    
    route.get(
        '/detail/:app_id',
        middlewares.admin.restrict,
        middlewares.admin.applicationsDetail ,
        middlewares.response.render('admin/detail')
        )
        
    route.get(
    '/files/:nip/:app_id/:file_name',
    middlewares.admin.restrict,
    middlewares.admin.getFiles
    )
    
    route.post(
    '/verify/:app_id',
    middlewares.admin.restrict,
    middlewares.admin.applicationsDetail ,
    middlewares.admin.verify
)
module.exports = route;