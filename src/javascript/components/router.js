import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './javascript/packs/firebase_config';

import Home from './javascript/components/home';
import WorkoutDay from './javascript/components/workout_day';
import Form from './javascript/components/form';

firebase.initializeApp(firebaseConfig);

const ReactRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workout/:id/edit" component={Form} />
        <Route path="/workout/:id" component={WorkoutDay} />
      </Switch>
    </Router>
  )
};

export default ReactRouter;
