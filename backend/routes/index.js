const { Router } = require('express')

const router = Router()

router.use('/', require('./Books.route'))
router.use('/', require('./Authors.route'))
router.use('/', require('./Genres.route'))
router.use('/', require('./Users.route'))
module.exports = router