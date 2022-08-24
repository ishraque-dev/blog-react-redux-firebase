import React, { useState, useEffect } from 'react';
import style from '../style/postItem.module.css';
import { getDatabase, ref, set, update, onValue } from 'firebase/database';
const PostItem = ({
  image,
  title,
  description,

  author,

  userId,
  HeartIcon,
  date,
  itemId,
  status,
  getDate,
}) => {
  // const [state, setState] = useState(status);
  const [userLiked, setUserLiked] = useState(true);
  const [data, setData] = useState();
  const [array, setArray] = useState();
  var d = Date(date);
  const formattedDate = d.toString().substring(0, 15);
  getDate(formattedDate);
  const db = getDatabase();

  const clickHandler = () => {
    update(ref(db, `items/${itemId}`), {
      status: true,
    });

    userLiked &&
      set(ref(db, 'liked/' + itemId + userId), {
        id: userId,
        itemId: itemId,
      });
  };

  let likedClass = status ? style.liked : null;
  useEffect(() => {
    const starCountRef = ref(db, 'liked/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setData(data);
    });

    //likes array te jodi current userId na thake then status false
    // likes?.forEach((itemId) => {
    //   if (itemId !== userId) {
    //     console.log('Not includes');
    //     setLiked(false);
    //   } else {
    //     console.log('Includes');
    //     setLiked(true);
    //   }
    // });
  }, [db]);
  useEffect(() => {
    for (const key in data) {
      // console.log(key);

      // console.log('ourItemID', itemId);
      if (key === itemId) {
        // console.log('Matched');
        setUserLiked(false);
      } else {
        // console.log('nai');
        setUserLiked(true);
      }
      if (data[key].id !== userId) {
        // console.log('not same person');
        setUserLiked(true);
      } else {
        // console.log('same person');
      }
    }
  }, [data, itemId, status, userId]);
  // useEffect(() => {
  //   for (const key in data) {
  //     if (data[key].id === userId) {
  //       console.log('Id ache');
  //       setState((pre) => {
  //         return !pre;
  //       });
  //       //  console.log(status);
  //       //  console.log(state);
  //       // update(ref(db, `items/${itemId}`), {
  //       //   status: true,
  //       // });
  //     } else {
  //       console.log('Id nai');
  //       console.log(status);
  //       console.log(state);
  //        setState((pre) => {
  //         return !pre;
  //       })
  //       // setState(true);
  //       // update(ref(db, `items/${itemId}`), {
  //       //   status: false,
  //       // });
  //     }
  //   }
  // }, [data, userId]);
  useEffect(() => {
    let arr = [];
    for (const key in data) {
      if (itemId === data[key].itemId) {
        // console.log('same Item');
        arr.push(data[key].itemId);
      } else {
        // console.log('different item');
      }
      setArray(arr);
    }
  }, [data, itemId]);

  return (
    <div className={style.wrapper}>
      <div className={style.postItem}>
        <div className={style.container}>
          <div className={style.left}>
            <img src={image} alt="" />
          </div>
          <div className={style.right}>
            <div className={style.profileInfo}>
              <p>
                {' '}
                {author}
                <br />
                <small> {formattedDate}</small>
              </p>

              <img src={image} alt="" />
            </div>
            <div className={style.blogContent}>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className={style.likes}>
              <HeartIcon className={likedClass} onClick={clickHandler} />
              <p>{array?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
