import { configureStore } from "@reduxjs/toolkit";
import books from '../features/booksSlice'
import categories from '../features/categoriesSlice'
import users from '../features/usersSlice'
export const store = configureStore({
reducer: {
    books,
    categories,
    users
}
})