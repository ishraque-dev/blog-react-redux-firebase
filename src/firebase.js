// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmbqYAiNkgzmivqk-Ecjy8au9oC3gnktU',
  authDomain: 'react-blogv1.firebaseapp.com',
  projectId: 'react-blogv1',
  storageBucket: 'react-blogv1.appspot.com',
  messagingSenderId: '345633407640',
  appId: '1:345633407640:web:45cd99ca4d8dba8d5486ed',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
