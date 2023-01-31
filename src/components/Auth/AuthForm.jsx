import { useState, useRef, useContext } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

function AuthForm() {
  const API_KEY = "AIzaSyBzYPaph353YMRBulRemQXpZrl3h1V7j1o"

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    setIsLoading(true)
    let url
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(res => {
      setIsLoading(false)
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(data => {
          let errorMsg = 'Authentication failed!'
          if (data && data.error && data.error.message) {
            errorMsg = data.error.message
          }
          throw new Error(errorMsg)
        })
      }
    })
      .then(data => {
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
        authCtx.login(data, expirationTime.toISOString())
        navigate('/')
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <>
      <Form method="post" className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required ref={emailInputRef} />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required ref={passwordInputRef} />
        </p>
        <div className={classes.actions}>
          {!isLoading && <button onClick={switchAuthHandler} type="button">
            {isLogin ? 'Create new user' : 'Login'}
          </button>}
          {isLoading && <p>Loading...</p>}
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
