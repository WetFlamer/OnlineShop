import React from "react";
import styles from "./styles/Book.module.css";
const BookCart = ({name, author, poster, price, description}) => {
  return (
    <div className={styles.books}>
      <div className={styles.booksBox}>
        <p className={styles.bookName}>{name}</p>
        <p className={styles.bookAuthor}>{author}</p>
        <p className={styles.bookDescription}>
         {description}
        </p>
        <p className={styles.bookPrice}>{price} ₽</p>
        <button className={styles.addCart}>В корзину</button>
      </div>
      <img
        className={styles.bookImage}
        src={poster}
        alt="..."
      />
    </div>
  );
};

export default BookCart;
