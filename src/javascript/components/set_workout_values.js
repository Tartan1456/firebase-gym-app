import React, { Fragment, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Header from './header';
import TextInput from './text_input';

function SetWorkoutValues({displayName, signOut, uid, history}) {
  const [workouts, setWorkouts] = useState([]);
  const [values, setValues] = useState([{}]);
  const [errors, setErrors] = useState({});

  const formatDate = date => new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toLocaleString('en-GB').split(",")[0];

  useEffect(() => {
    const db = firebase.firestore();
    const updatedWorkouts = [];

    db.collection("users").where('uid', '==', uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.collection('workouts').get().then(snapshot => {
          snapshot.forEach(doc => {
            updatedWorkouts.push({...doc.data(), date: formatDate(doc.data().date.toDate())});
          });
          setWorkouts(updatedWorkouts);
          setValues(updatedWorkouts);
        })
      });
    })
  }, []);

  const handleInputChange = (e, valuesPos, exercisesPos) => {
    const updatedValues = values.slice();
    const exercisesObj = updatedValues[valuesPos].exercises[exercisesPos];
    const key = e.target.name;
    if (key === 'sets') {
      exercisesObj.sets = e.target.value;
    } else if (key === 'reps') {
      exercisesObj.reps = e.target.value;
    } else if (key === 'weight') {
      exercisesObj.weight = e.target.value;
    }

    updatedValues[valuesPos].exercises[exercisesPos] = exercisesObj;

    setValues(updatedValues);
  }

  const sendWorkoutsToDatabase = async () => {
    const db = firebase.firestore();

    return db.collection("users").where('uid', '==', uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        values.forEach(workout => {
          doc.ref.collection('workouts').where('name', '==', workout.name).get().then(snapshot => {
            snapshot.forEach(doc => {
              return doc.ref.set({
                name: workout.name,
                date: workout.date,
                exercises: workout.exercises,
              })
            });
          })
        })
      });
    })
  }

  const setWorkoutsValues = (e) => {
    sendWorkoutsToDatabase().then();
  };

  return (
    <Fragment>
      <Header
        title='Create Workouts'
        displayName={ displayName }
        signOut={() => signOut()}
      />
      { workouts.map((workout, i) => {
        workout['valuesPos'] = i;

        return (
          <form className='set-workouts__form' key={ i }>
            <div className='set-workouts__workout-name'>{ workout.name }</div>
            <div className='set-workouts__workout-date'>{ workout.date }</div>
            { workout.exercises.map((exercise, i) => {
              return (
                <div className='set-workouts__workout-values' key={ i }>
                  <div className='set-workouts__exercise-name'>{ exercise.name }</div>
                  <TextInput
                    className='set-workouts'
                    type='text'
                    inputName='sets'
                    placeholder='Sets'
                    onChange={handleInputChange}
                    values={ values }
                    errors={ errors }
                    valuesPos={ workout.valuesPos }
                    exercisesPos={ i }
                  />
                  <TextInput
                    className='set-workouts'
                    type='text'
                    inputName='reps'
                    placeholder='Reps'
                    onChange={handleInputChange}
                    values={ values }
                    errors={ errors }
                    valuesPos={ workout.valuesPos }
                    exercisesPos={ i }
                  />
                  <TextInput
                    className='set-workouts'
                    type='text'
                    inputName='weight'
                    placeholder='Weight'
                    onChange={handleInputChange}
                    values={ values }
                    errors={ errors }
                    valuesPos={ workout.valuesPos }
                    exercisesPos={ i }
                  />
                </div>
              )
            }) }
          </form>
        );
      })}
      <div className='set-workouts__submit-workouts'>
        <button className='set-workouts__btn set-workouts__btn--submit' onClick={e => setWorkoutsValues(e)}>Create Workouts</button>
      </div>
    </Fragment>
  );
}

export default SetWorkoutValues;
