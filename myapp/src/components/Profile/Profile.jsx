import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, fetchTop } from "../../features/usersSlice";
import styles from "./Profile.module.css";
const Profile = () => {
  const [bookName, setBookName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [description, setDescription] = useState('')
  const [poster, setPoster] = useState('')
  const [price, setPrice] =useState('')
  const [category, setCategory] = useState('')
  const [left, setLeft] = useState('')
  const error = useSelector((state) => state.users.error)

const handleBookName = (e) =>{
  setBookName(e.target.value)
}
const handleAuthorName = (e) => {
  setAuthorName(e.target.value)
}
const handleDescription = (e) => {
  setDescription(e.target.value)
}
const handlePoster = (e) => {
  setPoster(e.target.value)
}
const handlePrice = (e) => {
  setPrice(e.target.value)
}
const handleCategory = (e) => {
  setCategory(e.target.value)
}
const handleLeft = (e) => {
  setLeft(e.target.value)
}

  const users = useSelector((state) => state.users.users)
  const successfully = useSelector((state) => state.users.successfully);
  const [topOpened, setTopOpened] = useState(false);
  const [addBlockOpened, setAddBlockOpened] = useState(false)
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
const handleAddBlock = () => {

  setAddBlockOpened(!addBlockOpened)
}
const handleCloseAddBlock = () => {

  setAddBlockOpened(false)
}


const handleAddBook = () => {
  dispatch(addBook({bookName, authorName, description, poster, price, left, category}))
  if(!error) {
    alert('Книга добавлена')
  }
}



  return (
    <div className={styles.profileBlock}>
      <h1 className={styles.userName}>{users.username} </h1>
      <h3 className={styles.balance}>Ваш баланс: {users.wallet} ₽ </h3>
      <button onClick={handleOpenTop} className={styles.topUp}>
        Пополнить
      </button>
  {users.roles === "ADMIN" ? <button onClick={handleAddBlock} className={styles.addBookButton}>Добавить книгу</button> : null}

     
      <button className={styles.exitButton} onClick={handleExit}>
        Выйти
      </button>
{addBlockOpened === true ? 
<div className={styles.addBlock}>
<button  onClick={handleCloseAddBlock} className={styles.close}>X</button>
<h3>Название книги:</h3>
<input onChange={handleBookName} value={bookName} className={styles.bookName} type="text" name="" id="" />
<h3>Автор книги:</h3>
<input onChange={handleAuthorName} value={authorName} className={styles.bookName} type="text" name="" id="" />
<h3>Описание книги</h3>
<input onChange={handleDescription} value={description} className={styles.bookName} type="text" name="" id="" />
<h3>Постер:</h3>
<input onChange={handlePoster} value={poster} className={styles.bookName} type="text" name="" id="" />
<h3>Цена:</h3>
<input onChange={handlePrice} value={price} className={styles.bookName} type="text" name="" id="" />
<h3>В наличии:</h3>
<input onChange={handleLeft} value={left} className={styles.bookName} type="text" name="" id="" />
<h3>Категории:</h3>
<input onChange={handleCategory} value={category} className={styles.bookName} type="text" name="" id="" />
<button onClick={handleAddBook}>Добавить</button>
</div> : null} 
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
