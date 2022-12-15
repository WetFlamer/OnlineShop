import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import cartImage from "./images/shopping-cart.png";
import leftImage from "./images/leftImage.png";
import { Link, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import Contacts from "./Pages/Contacts";
import Features from "./Pages/AboutUs";
import BookCart from "./BookCart";
import { authSignIn, authSignUp } from "../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./Authorization/SignIn";
import SignUp from "./Authorization/SignUp";
import { useEffect } from "react";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
const Header = () => {
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [regOpened, setRegOpened] = useState(false);
  const [openedProfile, setOpenedProfile] = useState(false)
  const [password, setPassword] = useState("");
  const [openCart, setOpenCart] = useState(false)
  const error = useSelector((state) => state.users.error);
  const token = useSelector((state) => state.users.token);
  const cart = useSelector((state) => state.users.cart)
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpened(!opened);
  };
  const handleOpenI = () => {
    setOpened(true)
    setRegOpened(false)
  }
  const handleOpenCart = () => {
    setOpenCart(!openCart)
  }
  const handleClose = () => {
    setOpened(false);
  };
  const handleSetLogin = (e) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOpenProfile = () => {
    setOpenedProfile(!openedProfile)
  }

  const handleSign =  async (e) => {
    e.preventDefault();
    dispatch(authSignIn({ username, password }));
    setUsername("");
    setPassword("");
    if(error.length < 0) {
      window.location.reload()
    }
  };

  useEffect(() => {
    if(token) {
      setOpened(false)
    } 
  }, [token])
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ username, password }));
    setUsername("");
    setPassword("");
  };
  const handleRegOpen = (e) => {
    setRegOpened(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a className={styles.logoText} href="/">
          MYBOOK
        </a>
      </div>
      <div className={styles.headLine}></div>
      <div className={styles.shoppingCart}>
        <img onClick={handleOpenCart} src={cartImage} alt="" />
        <p className={styles.cartCount}>{cart.length}</p>
        {openCart === true ? <Cart/> : null}
      </div>
      <div className={styles.leftSide}>
        <img className={styles.leftImage} src={leftImage} alt="" />
      </div>
      <div className={styles.navbar}>
        <div className={styles.navbarRoutes}>
          <Link className={styles.navButton} to="/">
            Home
          </Link>
          <Link className={styles.navButton2} to="/features">
            AboutUS
          </Link>
          <Link className={styles.navButton3} to="/contacts">
             Contacts
          </Link>
        </div>

        {token ?  (
          <button onClick={handleOpenProfile} className={styles.loginButton}>
            <p className={styles.logButtonText}>Профиль</p>
          </button>
        ) : (
          <button  onClick={handleOpen} className={styles.loginButton}>
            <p className={styles.logButtonText}>Log In</p>
          </button>
        )}
        {openedProfile === true ? 
        <Profile setOpenedProfile={setOpenedProfile}/>        
        : null}

        {opened === true ? (
          <div className={styles.loginBlock}>
            {regOpened === true ? (
              <SignUp
                handleSignIn={handleOpen}
                handleSetLogin={handleSetLogin}
                error={error}
                handleRegOpen={handleRegOpen}
                handleSetPassword={handleSetPassword}
                username={username}
                password={password}
                handleSignUp={handleSignUp}
                handleClose={handleClose}
                handleOpenI={handleOpenI}
              />
            ) : (
              <SignIn
                handleSetLogin={handleSetLogin}
                error={error}
                handleRegOpen={handleRegOpen}
                handleSetPassword={handleSetPassword}
                username={username}
                password={password}
                handleSign={handleSign}
                handleClose={handleClose}
              />
            )}
          </div>
        ) : null}
      </div>
      <div className={styles.headerTextBox}>
        <h1 className={styles.headerTitle}>read and add your insight</h1>
        <p className={styles.headerDescription}>
          find your favorite book and read it here for free
        </p>
        
      </div>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/category/:categoryId" element={<BookCart />} />
      </Routes>
    </div>
  );
};

export default Header;
