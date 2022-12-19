const Book = require("../models/book.model");

module.exports = booksController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      return res.json(error);
    }
  },
  addBook: async (req, res) => {
    const { name, authorId, left, author, description, poster, category, price,} = req.body;
    try {
      const book = await Book.create({
        name,
        author,
        authorId,
        description,
        poster,
        category,
        price,
        left
        
      });
      return res.json(book)
    } catch (error) {
      return res.json(error + "Ошибка при добавлении");
    }
  },
  getBookbyGenre: async (req, res) => {
    const {categoryId} = req.params 
    try {
      const book = await Book.findById({category: categoryId})
      return res.json(book)
    } catch (error) {
      return res.json(error)
    }
  },
};
