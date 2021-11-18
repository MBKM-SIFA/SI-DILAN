const router = require('express').Router();
const middleware = {
    response : require('../middlewares/response'),
    assignment : require('../middlewares/assignment'),
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
    middleware.response.render('user/apply-assignment')
)
.get(
    '/home',
    middleware.response.render('user/tugas-belajar')
)
.post(
    '/apply',
    middleware.assignment.insert,
    middleware.response.render('user/assignment-phase2')
)
.post(
    '/upload/:app_id',
    middleware.assignment.getById,
    middleware.assignment.restrictFile,
    middleware.assignment.upload(),
    middleware.assignment.getFilesData,
    middleware.assignment.recordUploadedFile,
    middleware.response.redirect('/user/applications')
)
.get(
    '/:app_id/:phase',
    middleware.assignment.getById,
    middleware.assignment.resume
)

module.exports = router;