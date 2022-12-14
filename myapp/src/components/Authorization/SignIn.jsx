import React from 'react';
import styles from "../styles/Header.module.css";
const SignIn = ({ handleClose, handleSign,username, handleSetPassword, handleSetLogin, password, handleRegOpen, error }) => {
    return (
        <div className={styles.loginSec}>
            <button onClick={handleClose} className={styles.closeButton}>x</button>
            <h1>Авторизация</h1>
            <form onSubmit={handleSign}>
            <h3>Логин:</h3>
            <input className={styles.inputLogin} onChange={handleSetLogin} type="text" name="" value={username} placeholder="Логин" id="" />
            <h3>Пароль:</h3>
            <input className={styles.inputLogin} onChange={handleSetPassword} type="password" value={password} placeholder="Пароль" />
            <br />
            <button disabled={username.length < 4|| password.length < 4 ? true : false} type="submit" className={styles.loginButtonIn}>Войти</button>
            <p onClick={handleRegOpen} className={styles.signUp}>Регистрация</p>
            {error ? <div className={styles.loginError}>{error}</div> : null}
            </form>
          </div>
    );
};

export default SignIn;