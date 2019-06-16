import React, { useState, useEffect, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import validate from './registerValidation';

import Header from './header'
import TextInput from './text_input';
import FormErrorMsg from './form_error_message';

function Register() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerAccount = (e, values) => {
    e.preventDefault();
    setErrors(validate(values, 'register'));
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    return setValues({...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(cred => {
        const db = firebase.firestore();
        return db.collection('users').add({
          uid: cred.user.uid,
        });
      }).catch(function(error) {
        setErrors({...errors, authCode: error.code, authMsg: error.message});
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: values.name,
          }).then((error) => {
            if (!error) {
              window.location.href = '/';
            } else {
              setErrors({...errors, nameError: error});
            }
          })
        }
      })
    }
  }, [errors, isSubmitting, values]);

  return (
    <Fragment>
      <Header
        title='Register'
      />
      <form className="register-form" onSubmit={(e) => registerAccount(e, values)} noValidate>
        <TextInput
          className='register-form'
          type='text'
          inputName='name'
          placeholder='Name *'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.name }
        />
        <TextInput
          className='register-form'
          type='email'
          inputName='email'
          placeholder='Email *'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.email }
        />
        <TextInput
          className='register-form'
          type='password'
          inputName='password'
          placeholder='Password *'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.password }
        />
        <TextInput
          className='register-form'
          type='password'
          inputName='confirmPassword'
          placeholder='Confirm Password *'
          onChange={handleChange}
          values={ values }
          errors={ errors }
        />
        <FormErrorMsg
          errorMsg={ errors.confirmPassword }
        />
        <input className="register-form__input register-form__submit-btn" type="submit" value="REGISTER" />
        <FormErrorMsg
          errorMsg={ errors.authMsg }
        />
        <FormErrorMsg
          errorMsg={ errors.nameError }
        />
      </form>
    </Fragment>
  );
}

export default Register;