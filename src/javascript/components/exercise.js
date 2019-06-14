import React from 'react';

const Exercise = ({ name, sets, reps, weight }) => (
  <div className='workout__exercise'>
    <div className='workout__exercise-name'>
      { name }
    </div>
    <div className='workout__sets'>
      { sets + 'x' + reps }
    </div>
    <div className='workout__weight'>
      { weight + 'kg' }
    </div>
  </div>
);

export default Exercise;
