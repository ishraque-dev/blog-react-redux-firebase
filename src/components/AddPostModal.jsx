import React, { useState,   } from 'react';
import { useDispatch,   } from 'react-redux';
import Modal from '@mui/material/Modal';
import styles from '../style/addPost.module.css';
import { postActions } from '../store/redux';
import { AiFillCamera } from 'react-icons/ai';
// import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from 'firebase/storage';
export default function AddPostModal({
  handelOpenModal,
  handleClose,
  open,
  close,
  userID,
  author,
  date,
}) {
  const [file, setFile] = useState();
  // const [downloadURL, setDownloadURL] = useState();
  const [url, setURL] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [progress, setProgress] = React.useState(0);
  const [uploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const inputChange = (e) => {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setURL(url);
  };
  const createdDate = Date.now();

  const uploadHandler = () => {
    const storage = getStorage();
    console.log(file);
    const metadata = {
      contentType: 'image/jpeg',
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setIsUploading(true);
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setProgress(progress);
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      // (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      //   switch (error.code) {
      //     case 'storage/unauthorized':
      //       // User doesn't have permission to access the object
      //       break;
      //     case 'storage/canceled':
      //       // User canceled the upload
      //       break;
      //     // ...
      //     case 'storage/unknown':
      //       // Unknown error occurred, inspect error.serverResponse
      //       break;
      //   }
      // },
      () => {
        setIsUploading(false);
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          // setDownloadURL(downloadURL);
          dispatch(
            postActions.uploadHandler({
              title: title,
              description: description,
              photoUrl: downloadURL,
              userID: userID,
              createdDate: createdDate,
              author: author,
            })
          );
        });
      }
    );
  };
  // console.log(title, description, file);
  if (progress === 100) {
    setTimeout(() => {
      handleClose();
      setProgress(0);
    }, 2000);
    clearTimeout(setTimeout);
  }
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.addPost}>
          <div className={styles.top}>
            <img src="" alt="" />
            <p>{author}</p>
            <small>{date}</small>
          </div>
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.input}>
                <input
                  required={true}
                  type="text"
                  placeholder="TITLE"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className={styles.input}>
                <textarea
                  required={true}
                  placeholder="ABOUT"
                  rows="5"
                  cols="35"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className={styles.right}>
              <img src={url} alt="" />
              <label htmlFor="inputTag">
                <p>Select an Image</p>
                <div className={styles.box}>
                  <div className={styles.circle}>
                    <CircularProgress variant="determinate" value={progress} />
                  </div>
                  <div className="camera">
                    <AiFillCamera />
                  </div>
                </div>
                <input
                  required={true}
                  id="inputTag"
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={inputChange}
                />
              </label>
              {title && description && file && (
                <button onClick={uploadHandler} className={styles.uploadBtn}>
                  {!uploading ? 'Upload' : `Uploading`}
                </button>
              )}
              <div className={styles.imgBox}></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
