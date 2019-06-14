import React, { useState, useEffect, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Header from './header'

function Register() {
  return (
    <Fragment>
      <Header
        title='Login'
      />
      <form className="register-form">
        <input className="register__input" type="email" name="email" placeholder="Email" />
        <input className="register__input" type="password" name="password" placeholder="Password" />
        <input className="register__input register__submit-btn" type="submit" value="REGISTER" />
      </form>
    </Fragment>
  );
}

export default Register;