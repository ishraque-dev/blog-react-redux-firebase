import React, { useState, useEffect } from 'react';

import style from '../style/home.module.css';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import PostItem from '../components/PostItem';
 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddPostModal from '../components/AddPostModal';
import { getDatabase, ref, onValue } from 'firebase/database';
const Home = () => {
  const db = getDatabase();
  const [userID, setUserId] = useState();
  const [name, setName] = useState();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState([]);
  const [date, setDate] = useState();
  const getDate = (item) => {
    setDate(item);
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName } = user;
        setName(displayName);

        setUserId(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const handelOpenModal = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const starCountRef = ref(db, 'items/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      let array = [];
      for (const key in data) {
        array.push({ ...data[key], id: key });
      }

      setItem(array);
      // const values = Object.values(data);
      // console.log(values);
      // let id;
      // values.forEach((value) => {
      //   console.log(value);
      //   console.log({ ...value });
      // });
      // for (const key in values) {
      //   id = key;
      // }
    });
  }, [db]);
  // Shorting array by timestamp
  function biggestToSmallest(a, b) {
    return b.createdDate - a.createdDate;
  }
  const sortedItem = item.sort(biggestToSmallest);

  return (
    <div className={style.home}>
      <AddPostModal
        handelOpenModal={handelOpenModal}
        handleClose={handleClose}
        open={open}
        userID={userID}
        author={name}
        date={date}
      />
      <header className={style.header}>
        <div className={style.logo}>
          <h1>ActBlog</h1>
        </div>
        <div className={style.icons}>
          <AiFillHome title="Home" />
          <BsFillFileEarmarkPostFill
            title="Add a Post"
            onClick={handelOpenModal}
          />
          <AiFillHeart title="Coming Soon" />
          <div className={style.small}>
            <small>Home</small>
            <small>Add</small>
            <small>Likes</small>
          </div>
        </div>
        <div className={style.profile}>
          <h2>Profile info</h2>
          <small>Coming soon!</small>
        </div>
      </header>
      <div className={style.container}>
        {sortedItem?.map((item) => {
          return (
            <PostItem
              title={item.title}
              description={item.description}
              image={item.photoUrl}
              author={item.author}
              authorImage=""
              userId={userID}
              HeartIcon={AiFillHeart}
              date={item.createdDate}
              itemId={item.id}
              status={item.status}
              likes={item.likes}
              getDate={getDate}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
