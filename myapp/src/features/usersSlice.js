import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  successfully: null,
  cart: [],
  bougth: [],
  users: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "FETCH_USERS",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users");
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/registration", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const users = await res.json();

      if (users.message) {
        return thunkAPI.rejectWithValue(users.message);
      }

      return thunkAPI.fulfillWithValue(users);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token.token);
      localStorage.setItem("id", token.id);
      return thunkAPI.fulfillWithValue(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchTop = createAsyncThunk(
  "user/topup",
  async ({ userId, wallet }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/${userId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          wallet,
        }),
      });
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error.message);
      }

      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addtoCart = createAsyncThunk(
  "addtoCart/book",
  async ({ userId, bookId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:4000/addtoCart/${userId}/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${thunkAPI.getState().users.token}`,
          },
        }
      );
      const user = await res.json();
      if (user.error) {
        thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user.cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addBook = createAsyncThunk(
  "ADD_BOOK",
  async (
    { bookName, authorName, authorId, description, poster, category, price, left },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`http://localhost:4000/books/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },
        body: JSON.stringify({
          name: bookName,
          author: authorName,
          description,
          poster,
          category,
          price,
          left,
        }),
      });
      const user = await res.json();
      if (user.error) {
        thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user.cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "fetch/cart",
  async ({ userId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/cart/${userId}`, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const user = await res.json();
      if (user.error) {
        thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user.cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const buyBook = createAsyncThunk(
  "buy/book",
  async ({ userId, price, bookId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/buy/${userId}/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },
        body: JSON.stringify({
          price,
        }),
      });
      const user = await res.json();
      if (user.error) {
        thunkAPI.rejectWithValue(user.error.message);
      }

      return thunkAPI.fulfillWithValue(user.cart, user.bougth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletefromCart = createAsyncThunk(
  "delete/cart",
  async ({ userId, bookId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:4000/cart/delete/${userId}/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${thunkAPI.getState().users.token}`,
          },
        }
      );
      const user = await res.json();
      if (user.error) {
        thunkAPI.rejectWithValue(user.error.message);
      }
      return thunkAPI.fulfillWithValue(user.cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const usersSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET-ЗАПРОС
      .addCase(fetchUsers.fulfilled, (state, action) => {
        action.payload.map((item) => {
          if (item._id === localStorage.getItem("id")) {
            state.users = item;
          }
          return state.users
        });
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
        state.successfully = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
        state.successfully = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
        state.successfully = action.payload;
      })

      // POST TOKEN
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
        state.token = null;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload;
      })
      // TOPUP
      .addCase(fetchTop.fulfilled, (state) => {
        state.error = null;
        state.successfully = "Вы успешно пополнили баланс";
      })
      .addCase(fetchTop.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTop.rejected, (state, action) => {
        state.error = action.payload;
      })
      // ADD TO CART
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addtoCart.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      // GET CART
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      // BUY BOOK
      .addCase(buyBook.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(buyBook.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(buyBook.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // DELETE FROM CART
      .addCase(deletefromCart.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(deletefromCart.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deletefromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // ADD BOOK
      .addCase(addBook.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(addBook.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
