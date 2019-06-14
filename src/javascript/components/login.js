import React, { useState, useEffect, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Header from './header'

function Login({ history }) {
  const redirectToRegister = history => {
    return history.push('register');
  };

  return (
    <Fragment>
      <Header
        title='Login'
      />
      <form className="login-form">
        <input className="login-form__input" type="email" name="email" placeholder="Email" />
        <input className="login-form__input" type="password" name="password" placeholder="Password" />
        <input className="login-form__input login-form__submit-btn" type="submit" value="LOGIN" />
      </form>
      <div className="login-form__register-text">
        <p>Don't have an account?</p>
        <button onClick={() => redirectToRegister(history)} className="login-form__register-btn">Create account</button>
      </div>
    </Fragment>
  );
}

export default Login;