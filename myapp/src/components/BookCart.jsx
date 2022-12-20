import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, fetchCart } from "../features/usersSlice";
import styles from "./styles/Book.module.css";
const BookCart = ({
  bookId,
  name,
  author,
  poster,
  left,
  price,
  description,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.id);
  const [disabled, setDisabled] = useState(false);
  const cart = useSelector((state) => state.users.cart);
  const token = useSelector((state) => state.users.token);
  const loading = useSelector((state) => state.users.loading);
  const handleAddtoCart = async () => {
    if (token) {
      if (!cart.includes(bookId)) {
        await dispatch(addtoCart({ userId: user, bookId }));
        setDisabled(true);
        await dispatch(fetchCart({ userId: user }));
      }
    } else if (!token) {
      alert(
        "Для того что бы добалять книги в корзину, вам нужно зарегистрироваться!"
      );
    }
  };
  useEffect(() => {
    if (cart.length > 0 && cart.includes(bookId)) {
      setDisabled(true);
    }
  }, [bookId, cart]);

  return (
    <div className={styles.books}>
      <div className={styles.booksBox}>
        <p className={styles.bookName}>{name}</p>
        <p className={styles.bookAuthor}>{author}</p>
        <p className={styles.bookDescription}> </p>
        <p className={styles.booksLeft}>Осталось: {left} шт</p>
        <p className={styles.booksLeft}> {description}</p>

        <p className={styles.bookPrice}>{price} ₽</p>
        <button
          disabled={disabled}
          onClick={handleAddtoCart}
          className={styles.addCart}
        >
          {disabled === true ? "В корзине" : "В корзину"}{" "}
        </button>
        {loading ? (
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        ) : null}
      </div>
      <img className={styles.bookImage} src={poster} alt="..." />
    </div>
  );
};

export default BookCart;
