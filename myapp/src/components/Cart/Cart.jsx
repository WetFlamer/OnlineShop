import { useSelector } from "react-redux";
import styles from "./Cart.module.css";
import CartModel from "./CartModel";
const Cart = () => {
  const cart = useSelector((state) => state.users.cart);
  const loading = useSelector((state) => state.users.loading);

 
  return (
    <div className={styles.cartBlock}>
      {loading === true ? (
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      ) : (
        <div>
          {cart.length > 0
            ? cart.map((item) => {
                return <CartModel id={item} />;
              })
            : null}
        </div>
      )}
    </div>
  );
};

export default Cart;
