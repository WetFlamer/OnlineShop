import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Header.module.css";
const SignIn = ({
  handleSignUp,
  username,
  handleSetPassword,
  handleSetLogin,
  password,
  error,
  handleClose,
  handleOpenI
}) => {
  const successfully = useSelector((state) => state.users.successfully)
  return (
    <div className={styles.loginSec}>
        <button onClick={handleClose} className={styles.closeButton}>x</button>
        <h1>Регистрация</h1>
      <form onSubmit={handleSignUp}>
        <h3>Логин:</h3>
        <input
          className={styles.inputLogin}
          onChange={handleSetLogin}
          type="text"
          name=""
          value={username}
          placeholder="Логин"
          id=""
        />
        <h3>Пароль:</h3>
        <input
          className={styles.inputLogin}
          onChange={handleSetPassword}
          type="password"
          value={password}
          placeholder="Пароль"
        />
        <br />
        <button
          disabled={username.length < 4 || password.length < 4 ? true : false}
          type="submit"
          className={styles.loginButtonIn}
        >
          Регистрация
        </button>
        <p onClick={handleOpenI} className={styles.signUp}>Войти</p>
        {successfully ? <div className={styles.successfully}>{successfully}</div> : null}
        {error ? <div className={styles.loginError}>{error}</div> : null}
      </form>
    </div>
  );
};

export default SignIn;
