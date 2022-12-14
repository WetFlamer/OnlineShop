import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  loading: false,
  error: null
};

export const fetchCategories = createAsyncThunk('categories/fetch', async (data, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:4000/categories')
        const categories = await res.json()
        if(categories.error) {
            return thunkAPI.rejectWithValue(categories.error.message)
        }
        return thunkAPI.fulfillWithValue(categories)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
    })
  },
});
export default categoriesSlice.reducer