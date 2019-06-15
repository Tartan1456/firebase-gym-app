import React, { Fragment } from 'react';

import Header from './header';
import WorkoutContainer from './workouts';

const Home = ({displayName, signOut}) => (
  <Fragment>
    <Header
      title='Workouts'
      displayName={ displayName }
      signOut={() => signOut()}
    />
    <WorkoutContainer />
  </Fragment>
);

export default Home;
