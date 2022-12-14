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
    const { name, authorId, translater, publisher, author, description, poster, category, price,} = req.body;
    try {
      const book = await Book.create({
        name,
        author,
        authorId,
        translater,
        publisher,
        description,
        poster,
        category,
        price
        
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
  }
};
