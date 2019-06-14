import React from 'react';

import Header from './header';
import WorkoutContainer from './workouts';

const Home = () => (
  <div>
    <Header
      title='Workouts'
    />
    <WorkoutContainer />
  </div>
);

export default Home;
