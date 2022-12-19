const { Router } = require('express')
const usersController = require('../controllers/Users.controller')
const authMiddleware = require("../middleware/auth.middleware");
const {check} = require('express-validator')
const router = Router()

router.post('/registration',[
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 или меньше 10 символов').isLength({min: 4, max:10})
], usersController.registration)
router.post('/login', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 или меньше 10 символов').isLength({min: 4, max:10})],
     usersController.login)
router.get('/users', usersController.getUsers)
router.patch('/:userId', authMiddleware, usersController.topUp)
router.patch('/addtoCart/:userId/:bookId', authMiddleware, usersController.addToCart)
router.get('/cart/:userId',  usersController.getCart)
router.patch('/buy/:userId/:bookId', authMiddleware, usersController.buyBook)
router.patch('/cart/delete/:userId/:bookId', authMiddleware, usersController.deletefromCart)

module.exports = router