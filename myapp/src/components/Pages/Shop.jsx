import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../features/booksSlice";
import { fetchCart } from "../../features/usersSlice";
// import { fetchCategories } from "../../features/categoriesSlice";
import BookCart from "../BookCart";
// import Genres from "../Genres";
import styles from "../styles/Shop.module.css";
const Shop = () => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
const token = useSelector((state) => state.users.token)
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, [dispatch])
  const user = useSelector((state) => state.users.id)

  useEffect(() => {
   if(token) {
    dispatch(fetchCart({userId: user}))
   }
}, [dispatch, token, user])

  return (
    <div>
      {/* <Genre  s /> */}
      <div className={styles.bookCenter}>
        {books.map((book) => {
          return (
            <BookCart
            left={book.left}
              name={book.name}
              author={book.author}
              price={book.price}
              category={book.category}
              poster={book.poster}
              description={book.description}
              bookId={book._id}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        <Link className={styles.footerLogo}>2022 MYBOOK</Link>
        <Link to="/" className={styles.footerText}>
          Home
        </Link>
        <Link to="/features" className={styles.footerText}>
          Features
        </Link>
        <Link to="/contacts" className={styles.footerText}>
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Shop;
