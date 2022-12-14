const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/role.model");
const { validationResult } = require("express-validator");

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
        return res.status(400).json({error: "Ошибка при регистрации"} + errors);
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
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({error:'Не правильный логин или пароль'});
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      res.status(400).json("Login Error" + error);
    }
  },
  getUsers: async (req, res) => {
    try {
    } catch (error) {
      res.json(error);
    }
  },
};
