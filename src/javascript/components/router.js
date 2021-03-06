import React, { useState, useEffect } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import Home from './home';
import WorkoutDay from './workout_day';
import Login from './login';
import Register from './register';
import Form from './form';
import CreateWorkouts from './create_workouts';
import SetWorkoutValues from './set_workout_values';
import Loading from './loading';

function ReactRouter() {
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setFirebaseUser(user);
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  });

  const signUserOut = () => {
    firebase.auth().signOut();
    window.location.href = '/';
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => {
          return !loading ? (
            loggedIn ? (
              <Home
                {...firebaseUser}
                signOut={() => signUserOut()}
              />
            ) : (
              <Login
                {...props}
              />
            )
          ) : (
            <Loading />
          )
        }} />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/:id/create-workouts" render={props => {
          return <CreateWorkouts {...props} {...firebaseUser} signOut={() => signUserOut()} />
        }} />
        <Route exact path="/:id/set-workouts" render={props => {
          return !loading ? (
            loggedIn ? (
              <SetWorkoutValues
                {...props}
                {...firebaseUser}
                signOut={() => signUserOut()}
              />
            ) : (
              <Login
                {...props}
              />
            )
          ) : (
            <Loading />
          )
        }} />
        <Route exact path="/workout/:id/edit" component={ Form } />
        <Route path="/workout/:id" render={props => {
          return !loading ? (
            loggedIn ? (
              <WorkoutDay
                {...props}
                {...firebaseUser}
                signOut={() => signUserOut()}
              />
            ) : (
              <Login
                {...props}
              />
            )
          ) : (
            <Loading />
          )
        }} />
      </Switch>
    </Router>
  )
};

export default ReactRouter;
