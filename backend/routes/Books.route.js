const { Router } = require('express')
const booksController = require('../controllers/Books.controller')

const router = Router()

router.get('/books', booksController.getAllBooks)
router.get('/books/:categoryId', booksController.getBookbyGenre)

router.post('/books/add', booksController.addBook)

module.exports = router