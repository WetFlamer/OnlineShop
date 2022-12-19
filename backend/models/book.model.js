const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: String,
    author: String,
    authorId: {
        ref: 'authors',
        type: mongoose.SchemaTypes.ObjectId
    },
    description: String,
    poster: String,
    category: {
        ref: "categories",
        type: mongoose.SchemaTypes.ObjectId
    },
    price: Number,
    left: Number,
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book