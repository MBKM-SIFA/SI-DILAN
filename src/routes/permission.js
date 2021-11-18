const router = require('express').Router();
const middleware = {
    response : require('../middlewares/response'),
    permission : require('../middlewares/permission'),
    employee : require('../middlewares/employee'),
    auth : require('../middlewares/auth')
}

router.use(
    '/',
    middleware.auth.restrict
)

router
.get(
    '/apply',
    middleware.response.render('user/ib-form-1')
)
.post(
    '/apply',
    middleware.permission.insert,
    middleware.response.render('user/permission-phase2')
)
.get(
    '/home',
    middleware.response.render('user/izin-belajar')
)
.get(
    '/proceed/:app_id',
    middleware.permission.proceed,
    middleware.permission.getById,
    middleware.response.render('user/permission-phase3')
)
.get(
    '/pdf/:app_id',
    middleware.permission.getById,
    middleware.employee.get,
    middleware.permission.restrictFile,
    middleware.response.render('user/permissionPDF')
)
.post(
    '/upload/:app_id',
    middleware.permission.getById,
    middleware.permission.restrictFile,
    middleware.permission.upload(),
    middleware.permission.getFilesData,
    middleware.permission.recordUploadedFile,
    middleware.response.redirect('/user/applications')
)
.get(
    '/:app_id/:phase',
    middleware.permission.getById,
    middleware.permission.resume
)

module.exports = router;