import React, { Fragment } from 'react';

import Header from './header';
import WorkoutContainer from './workouts';

const Home = ({displayName}) => (
  <Fragment>
    <Header
      title='Workouts'
      displayName={ displayName }
    />
    <WorkoutContainer />
  </Fragment>
);

export default Home;
