const { Router } = require('express')
const genresController = require('../controllers/Genres.controller')

const router = Router()

router.get("/categories", genresController.getAllGenres);
router.post('/category/add', genresController.addGenre)

module.exports = router