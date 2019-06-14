import React, { Fragment } from 'react';

import Header from './header';
import WorkoutContainer from './workouts';

const Home = () => (
  <Fragment>
    <Header
      title='Workouts'
    />
    <WorkoutContainer />
  </Fragment>
);

export default Home;
