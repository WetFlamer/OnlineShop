const { Router } = require('express')
const usersController = require('../controllers/Users.controller')
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


module.exports = router