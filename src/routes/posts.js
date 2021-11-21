const router = require('express').Router();
const { ESRCH } = require('constants');
const path = require('path');
const middlewares = {
    auth : require('../middlewares/auth'),
    user : require('../middlewares/user'),
    employee : require('../middlewares/employee'),
    response : require('../middlewares/response'),
    articles : require('../middlewares/articles')
}
router.get(
    '/home',
    middlewares.articles.getAll,
    middlewares.response.render('admin/informasi-beasiswa')
)
router.get(
    '/insert',
    (req, res, next) => {res.locals.posts = ''; next();},
    middlewares.response.render('admin/unggah-informasi-beasiswa')
    )
router.get(
    '/update/:post_id',
    middlewares.articles.update,
    middlewares.response.render('admin/unggah-informasi-beasiswa')
)
router.post(
    '/update/:post_id',
    middlewares.articles.storePhoto(),
    middlewares.articles.updateById,
    middlewares.response.redirect('/posts/home')
    )
router.get(
    '/delete/:post_id',
    middlewares.articles.delete,
    middlewares.response.redirect('/posts/home')
)
router.post(
    '/insert',
    middlewares.articles.insert,
    middlewares.response.redirect('/posts/home')
)


module.exports = router;