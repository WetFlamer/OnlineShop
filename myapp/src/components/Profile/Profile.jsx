import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop } from "../../features/usersSlice";
import styles from "./Profile.module.css";
const Profile = ({ setOpenedProfile }) => {
  const username = useSelector((state) => state.users.username);
  const balance = useSelector((state) => state.users.wallet);
  const successfully = useSelector((state) => state.users.successfully);
  const [topOpened, setTopOpened] = useState(false);
  const id = localStorage.getItem("id");
  const [topUp, setTopUp] = useState();
  const dispatch = useDispatch();
  const handleExit = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleTopUp = (e) => {
    setTopUp(Number(e.target.value));
  };
  const handleOpenTop = () => {
    setTopOpened(!topOpened);
  };

  
  const handleT =  async (e) => {
     e.preventDefault();
      await dispatch(fetchTop({ userId: id, wallet: topUp }));
     setTopUp("");
  };

  return (
    <div className={styles.profileBlock}>
      <h1 className={styles.userName}>{username} </h1>
      <h3 className={styles.balance}>Ваш баланс: {balance} ₽ </h3>
      <button onClick={handleOpenTop} className={styles.topUp}>
        Пополнить
      </button>
      <button className={styles.exitButton} onClick={handleExit}>
        Выйти
      </button>

      {topOpened ? (
        <div className={styles.topUpBlock}>
          <h2 className={styles.topUpTitle}>Пополнение баланса</h2>
          <form onSubmit={handleT}>
            <input
              onChange={handleTopUp}
              className={styles.topInput}
              type="text"
              placeholder="Сумма пополнения..."
            />
            <button type="submit" className={styles.topUpButton}>
              Пополнить
            </button>
          </form>
          {successfully ? (
            <div className={styles.successfully}>{successfully}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
