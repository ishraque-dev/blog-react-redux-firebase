import React, { useState } from 'react';
import style from '../style/signUp.module.css';
import Input from '../components/Input';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  // const [user, setUser] = useState();
  const changeHandler = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };
  const { name, email, password } = form;
  const submitHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const u = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            navigate('/home', {
              state: {
                user: 'user',
              },
            });
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <div className={style.signup}>
      <div>
        <h1>Sign Up</h1>
      </div>
      <form className={style.form} onSubmit={submitHandler}>
        <div className={style.input}>
          <Input
            input={{
              type: 'text',
              name: 'name',
              placeholder: 'Name',
            }}
            value={form.name}
            onChange={changeHandler}
          />
        </div>
        <div className={style.input}>
          <Input
            input={{
              name: 'email',
              type: 'email',
              placeholder: 'Email',
            }}
            value={form.email}
            onChange={changeHandler}
          />
        </div>
        <div className={style.input}>
          <Input
            input={{
              type: 'password',
              name: 'password',
              placeholder: 'Password',
            }}
            value={form.password}
            onChange={changeHandler}
          />
        </div>
        <button className={style.buttonSubmit}>SignUp</button>
      </form>
      <Link to={'/login'}>
        {' '}
        <small>Login</small>
      </Link>
    </div>
  );
};

export default SignUp;
