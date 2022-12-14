const Author = require("../models/author.model");

module.exports = authorsController = {
  addAuthor: async (req, res) => {
    const { name} = req.body;
    try {
      const author = await Author.create({
        name,
      });
      return res.json(author)
    } catch (error) {
      return res.json(error + "Ошибка при добавлении");
    }
  },
};
