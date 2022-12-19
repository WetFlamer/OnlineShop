const jwt = require("jsonwebtoken");
module.exports = function (roles) {
  return function (req, res, next) {
    if (!authorization) {
      return res.status(401).json("нет авторизации");
    }
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json("неверный тип токена");
    }

    try {
      const { roles: userRole } = jwt.verify(token, process.env.SECRET_JWT_KEY);
      let hasRole = false
      userRole.forEach(role => {
        if(roles.includes(role)){
            hasRole = true
        }
      })
      if(!hasRole) {
        return res.status(403).json('У вас нет доступа')
      }
      next();
    } catch (error) {
      return res.status(401).json(error + "неверный токен");
    }
  };
};
