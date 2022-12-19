const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/role.model");
const { validationResult } = require("express-validator");
const Book = require("../models/book.model");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: "24h" });
};
module.exports = usersController = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Пароль должен быть больше 4 или меньше 10 символов'});
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({error:"Пользователь с таким именем уже существует"});
      }
      const hashPassword = bcrypt.hashSync(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const userRole = await Role.findOne({ value: "USER" });
      const user = User.create({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      return res.json("Пользователь успешно зарегестрирован");
    } catch (error) {
      res.status(400).json("Registration Error" + error);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({error:`Пользователь ${username} не найден`});
      }
      const wallet = await user.wallet
      const id = user._id
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({error:'Не правильный логин или пароль'});
      }
      const token = await generateAccessToken(user._id, user.roles, user.username);
      return res.json({ token, username, wallet, id});
    } catch (error) {
      res.status(400).json("Login Error" + error);
    }
  },
  topUp: async (req,res) => {
    const {userId} = req.params
    try {
      const wal = await User.findById(userId)
      const wals = await wal.wallet
      const user = await User.findByIdAndUpdate(userId, {
        wallet: req.body.wallet + wals
      }) 
      return res.json(user)
    } catch (error) {
      res.json(error + 'fgdfg')
    }
  },
  addToCart: async (req, res) => {
    const {userId} = req.params
    try {
      const user = await User.findByIdAndUpdate(userId, {
$push: {cart: req.params.bookId}
      })
      return res.json(user)
    } catch (error) {
      res.json(error)
    }
  },
  getCart: async (req, res) => {
    const {userId} = req.params
    try {
      const user = await User.findById(userId)
      return res.json(user)
    } catch (error) {
      res.json(error)
    }
  },
  getUsers: async (req, res) => {
    try {
    } catch (error) {
      res.json(error);
    }
  },
  buyBook: async (req, res) => {
    const {userId, bookId} = req.params
    try {
      const wal = await User.findById(userId)
      const wals = await wal.wallet
      const book = await Book.findById(bookId)
      const lef = await book.left
      const user = await User.findByIdAndUpdate(userId, {
        $push: {bought: bookId},
        wallet: wals - book.price,
       $pull: {cart: bookId},
       wallet: req.body.price - wals
      }, {new: true})
      const bok = await Book.findByIdAndUpdate(bookId, {
        left: lef - 1
      })
      return res.json({user})
    } catch (error) {
      res.json(error)
    }
  },
  deletefromCart: async (req, res) => {
    const {userId, bookId} = req.params
    try {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: {cart: bookId}
      }, {new: true})
      return res.json({user})
    } catch (error) {
      res.json(error)
    }
  },
};
