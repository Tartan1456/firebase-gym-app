import React, { useState, useEffect, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import validate from './registerValidation';

import Header from './header'
import TextInput from './text_input';
import FormErrorMsg from './form_error_message';

function Login({ history }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = (e, values) => {
    e.preventDefault();
    setErrors(validate(values, 'login'));
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    return setValues({...values, [e.target.name]: e.target.value })
  }

  const redirectToRegister = history => {
    return history.push('register');
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
        setErrors({...errors, authCode: error.code, authMsg: error.message});
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          window.location.href = '/';
        }
      })
    }
  }, [errors, isSubmitting, values]);
  

  return (
    <Fragment>
      <Header
        title='Login'
      />
      <form className="login-form" onSubmit={(e) => login(e, values)} noValidate>
        <TextInput
          className='login-form'
          type='email'
          inputName='email'
          placeholder='Email'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.email }
        />
        <TextInput
          className='login-form'
          type='password'
          inputName='password'
          placeholder='Password'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.password }
        />
        <input className="login-form__input login-form__submit-btn" type="submit" value="LOGIN" />
        <FormErrorMsg
          errorMsg={ errors.authMsg }
        />
      </form>
      <div className="login-form__register-text">
        <p>Don't have an account?</p>
        <button onClick={() => redirectToRegister(history)} className="login-form__register-btn">Create account</button>
      </div>
    </Fragment>
  );
}

export default Login;