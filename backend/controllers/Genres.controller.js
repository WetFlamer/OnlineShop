const Genre = require("../models/genre.model");

module.exports = genresController = {
  getAllGenres: async (req, res) => {
    try {
      const categoires = await Genre.find();
      res.json(categoires);
    } catch (error) {
      return res.json(error);
    }
  },
  addGenre: async (req, res) => {
    const { name } = req.body;
    try {
      const genre = await Genre.create({
        name,
      });
      return res.json(genre);
    } catch (error) {
      return res.json(error + "Ошибка при добавлении");
    }
  },
};
