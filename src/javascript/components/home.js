import React, { Fragment } from 'react';

import Header from './header';
import WorkoutContainer from './workouts';

const Home = ({uid, displayName, signOut}) => (
  <Fragment>
    <Header
      title='Workouts'
      displayName={ displayName }
      signOut={() => signOut()}
    />
    <WorkoutContainer
      uid={ uid } 
    />
  </Fragment>
);

export default Home;
