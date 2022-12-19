import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyBook, deletefromCart, fetchCart } from "../../features/usersSlice";
import styles from "./Cart.module.css";

const CartModel = ({ id }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users.id);
  const balance = useSelector((state) => state.users.wallet);

  return (
    <div className={styles.cartSection}>
      {books.map((book) => {
        const handleBuy = async () => {
          if (balance >= book.price) {
            await dispatch(
              buyBook({ userId, bookId: book._id, price: book.price })
            );
            await dispatch(fetchCart({ userId: user }));
            await alert('Вы успешно купили книгу! Доставка будет через: Никогда')
          } else {
            alert("Не достаточно средств");
          }
        };
        const handleDeleteFromCart = async () => {
          await dispatch(deletefromCart({ userId, bookId: book._id }));
          await dispatch(fetchCart({ userId: user }));
        };
        if (id === book._id) {
          return (
            <div>
              <img className={styles.poster} src={book.poster} alt="" />
              <h3 className={styles.bookTitle}>{book.name}</h3>
              <p className={styles.leftText}>Осталось: {book.left} шт.</p>
              <h2 className={styles.price}>{book.price} ₽</h2>
              <button
                onClick={handleDeleteFromCart}
                className={styles.deleteButton}
              >
                Удалить с корзины
              </button>
              <button onClick={handleBuy} className={styles.buyButton}>
                {" "}
                Купить
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CartModel;
