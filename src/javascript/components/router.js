import React, { useState, useEffect } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../packs/firebase_config';

import Home from './home';
import WorkoutDay from './workout_day';
import Login from './login';
import Register from './register';
import Form from './form';

firebase.initializeApp(firebaseConfig);

function ReactRouter() {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedIn(true);
      }
    });
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => {
          return loggedIn ? (
            <Home />
          ) : (
            <Login
              {...props}
            />
          )
        }} />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/workout/:id/edit" component={ Form } />
        <Route path="/workout/:id" component={ WorkoutDay } />
      </Switch>
    </Router>
  )
};

export default ReactRouter;
