import React, { useState, useEffect, useRef, Fragment } from 'react';

import Set from './set';

export default function SetContainer({ name, sets, reps, weight, i, id, complete, date }) {
  const lsId = date + name;
  const isInitialMount = useRef(true);

  const initialComplete = () => Boolean(complete);
  const initialRep = (sets, reps) => {
    let repsArr = [];

    for (let i = 0; i < sets; i++) {
      repsArr.push(
        reps
      )
    }

    return JSON.parse(localStorage.getItem(lsId))|| repsArr;
  }

  const [repsState, setReps] = useState(initialRep(sets, reps));
  const [setComplete, setCompleteState] = useState(initialComplete);

  const createSet = (sets, reps, date, name) => {
    let workoutSets = [];

    for (let i = 0; i < sets; i++) {
      workoutSets.push(
        <Set
          rep={ repsState[i] }
          key={ i }
          statePos={ i }
          keyId={ date + name + i }
          handleRepClick={ handleRepClick }
        />
      )
    }

    return workoutSets;
  };

  const handleRepClick = (arrPos) => {
    if (repsState[arrPos] > 0) {
      const newRepVal = repsState[arrPos] - 1;
      const newRepsState = repsState.slice();
      newRepsState[arrPos] = newRepVal;
      setReps(newRepsState);
    }
  }

  useEffect(() => {
    localStorage.setItem(lsId, JSON.stringify(repsState));
  }, [repsState])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let passed = false;
      if (JSON.parse(localStorage.getItem(lsId)).every( (val, i, arr) => val === reps)) {
        passed = true;
      }
      postToResults(id, setComplete, passed);
    }
  }, [setComplete]);

  const completeSet = () => {
    setCompleteState(true);
  }

  const postToResults = (id, setComplete, passed) => {
    fetch('/api/results', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complete: setComplete,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        target_id: id,
        passed,
      })
    })
    .then(response => response.json());
  }

  return (
    <div className="workoutDay__exercise">
      <div className="workoutDay__exercise-name" key={ name }>
        { name }
      </div>
      <div className="workoutDay__weight" key={ weight + i }>
        { `${sets} x ${reps} ${weight}kg`  }
      </div>
      { complete || setComplete
        ?
          <div className="workoutDay__set" key={ sets + i } >
            Complete
          </div>
        :
          <Fragment>
            <div className="workoutDay__set" key={ sets + i } >
              { createSet(sets, reps, date, name) }
            </div>
            <button
              className="workoutDay__complete"
              onClick={ () => completeSet() }
            >
              Finished
            </button>
          </Fragment>
      }
    </div>
  )
};
