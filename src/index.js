import React from 'react';
import { render } from 'react-dom';
import ReactRouter from './javascript/components/router';

import * as firebase from 'firebase/app';
import firebaseConfig from './javascript/packs/firebase_config';

import './javascript/styles/application.scss';

firebase.initializeApp(firebaseConfig);

render(<ReactRouter />,  document.getElementById('root'));
