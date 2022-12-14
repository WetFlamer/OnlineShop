import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
  loading: false,
  error: null
};

export const fetchBooks = createAsyncThunk('books/fetch', async (data, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:4000/books')
        const books = await res.json()
        if(books.error) {
            return thunkAPI.rejectWithValue(books.error.message)
        }
        return thunkAPI.fulfillWithValue(books)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const fetchBooksbyGenre = createAsyncThunk('bookbyId/fetch', async (data, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4000/books/:${data.id}`)
    const books = await res.json()
    if(books.error) {
        return thunkAPI.rejectWithValue(books.error.message)
    }
    return thunkAPI.fulfillWithValue(books)
} catch (error) {
    return thunkAPI.rejectWithValue(error.message)
}
})


const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload
        state.loading = false
    })
    .addCase(fetchBooks.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
.addCase(fetchBooks.rejected, (state, action) => {
  state.loading = false
  state.error = action.payload
})
    .addCase(fetchBooksbyGenre.fulfilled, (state, action) => {
      state.books = action.payload
      state.loading = false
    })
    .addCase(fetchBooksbyGenre.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchBooksbyGenre, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
});
export default booksSlice.reducer