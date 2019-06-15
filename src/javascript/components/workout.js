import React from 'react';

const Workout = ({ date, name, children }) => (
  <div className='workout'>
    <div className='workout__date'>
      { date }
    </div>
    <div className='workout__muscle-set'>
      { name }
    </div>
    <div className='workout__exercises'>
      { children }
    </div>
  </div>
);

export default Workout;
