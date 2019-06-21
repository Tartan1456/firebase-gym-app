import React, { Fragment, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';

import Header from './header';
import TextInput from './text_input';

function SetWorkoutValues({displayName, signOut, uid, history}) {
  const [workouts, setWorkouts] = useState([]);
  const [values, setValues] = useState([{}]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const db = firebase.firestore();
    const updatedWorkouts = [];

    db.collection("users").where('uid', '==', uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.collection('workouts').get().then(snapshot => {
          snapshot.forEach(doc => {
            updatedWorkouts.push({...doc.data(), date: doc.data().date.toDate().toString(), dateString: moment(doc.data().date.toDate()).format('DD/MM/YYYY')});
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
          doc.ref.collection('workouts').where('name', '==', workout.name).where('date', '==', new Date(workout.date)).get().then(snapshot => {
            snapshot.forEach(doc => {
              return doc.ref.set({
                name: workout.name,
                date: new Date(workout.date),
                exercises: workout.exercises,
              })
            });
          })
        })
      });
    })
  }

  const setWorkoutsValues = (e) => {
    sendWorkoutsToDatabase().then(() => history.push('/'));
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
            <div className='set-workouts__workout-date'>{ workout.dateString }</div>
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
