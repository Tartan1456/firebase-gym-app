import React from 'react';

const Set = ({ rep, handleRepClick, statePos }) => (
  <button
    className="workoutDay__rep"
    onClick={ () => handleRepClick(statePos) }
  >
    { rep }
  </button>
);

export default Set;
