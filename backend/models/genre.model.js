const mongoose = require("mongoose");

const genresSchema = mongoose.Schema({
  name: String,
});

const Genre = mongoose.model("categories", genresSchema);

module.exports = Genre;
