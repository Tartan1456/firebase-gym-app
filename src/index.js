import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Home from './javascript/components/home';
import WorkoutDay from './javascript/components/workout_day';
import Form from './javascript/components/form';

const Index = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/workout/:id/edit" component={Form} />
      <Route path="/workout/:id" component={WorkoutDay} />
    </Switch>
  </Router>
);

export default Index;
