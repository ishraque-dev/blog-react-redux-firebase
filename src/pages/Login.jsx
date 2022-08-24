import React, { useState } from 'react';
import style from '../style/login.module.css';
import Input from '../components/Input';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };
  const { email, password } = form;
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  return (
    <div className={style.login}>
      <div>
        <h1>Login</h1>
      </div>
      <form className={style.form} onSubmit={submitHandler}>
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
        <button className={style.buttonSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
