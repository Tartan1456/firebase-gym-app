import React, { Fragment, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Header from './header';
import TextInput from './text_input';

function SetWorkoutValues({displayName, signOut, uid, history}) {
  return (
    <Fragment>
      <Header
        title='Create Workouts'
        displayName={ displayName }
        signOut={() => signOut()}
      />
    </Fragment>
  );
}

export default SetWorkoutValues;
