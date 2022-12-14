const mongoose = require("mongoose");

const authorScheme = mongoose.Schema({
  name: String,
});
const Author = mongoose.model("authors", authorScheme);

module.exports = Author;
