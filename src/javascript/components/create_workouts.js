import React, { Fragment, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Header from './header';
import TextInput from './text_input';

function CreateWorkouts({displayName, signOut, uid, history}) {
  const [forms, setForms] = useState([{exercises: []}]);
  const [exercises, setExercises] = useState([{}]);
  const [addWorkoutBtn, setAddWorkoutBtn] = useState(true);
  const [addExerciseBtn, setAddExerciseBtn] = useState(true);
  const [values, setValues] = useState([{}]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let newExercises = [], chestExercisesValue = [], armExercisesValue = [], chestExercises = {}, armExercises = {};
    const db = firebase.firestore();
    db.collection('exercises').get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.collection('Chest').get().then(snapshot => {
          snapshot.forEach(doc => {
            chestExercisesValue.push(doc.data().name);
          })
          chestExercises['Chest'] = chestExercisesValue;
          newExercises.push(chestExercises);
          setExercises(newExercises);
        });

        doc.ref.collection('Arms').get().then(snapshot => {
          snapshot.forEach(doc => {
            armExercisesValue.push(doc.data().name);
          })
          armExercises['Arms'] = armExercisesValue;
          newExercises.push(armExercises);
          setExercises(newExercises);
        });
      });
    });
  }, []);

  const handleFormChange = (e, valuesPos) => {
    const updatedWorkoutValues = values.slice();
    const currentFormObject = updatedWorkoutValues[valuesPos];
    currentFormObject[e.target.name] = e.target.value;
    updatedWorkoutValues[valuesPos] = currentFormObject;
    return setValues(updatedWorkoutValues);
  }

  const handleSelectChange = (e, exerciseFormPos, formValuesPos) => {
    const updatedExerciseValues = values.slice();
    const currentFormObject = updatedExerciseValues[formValuesPos];
    const formExercises = (currentFormObject.exercises ? currentFormObject.exercises : [{}]);
    const exerciseObj = (formExercises[exerciseFormPos] ? formExercises[exerciseFormPos] : {});
    exerciseObj.name = e.target.value;
    formExercises[exerciseFormPos] = exerciseObj;
    updatedExerciseValues[formValuesPos].exercises = formExercises;
    return setValues(updatedExerciseValues);
  };

  const sendWorkoutsToDatabase = async () => {
    const db = firebase.firestore();

    return db.collection("users").where('uid', '==', uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        values.forEach(workout => {
          return doc.ref.collection('workouts').add({
            name: workout.name,
            date: new Date(workout.startDate),
            exercises: workout.exercises,
          });
        });
      });
    })
  }

  const createWorkouts = (e) => {
    sendWorkoutsToDatabase().then(() => history.push('/'));
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (forms.length < 5) {
      setForms([...forms, {exercises: []}]);
      setValues([...values, {}]);

      if (forms.length === 4) {
        setAddWorkoutBtn(false);
      }
    }
  }

  const addExerciseDropdown = (e, forms, i) => {
    e.preventDefault();
    const updatedForms = forms.slice();
    if (updatedForms[i].exercises.length < 5) {
      updatedForms[i].exercises.push('Choose an exercise');

      if (updatedForms[i].exercises.length === 5) {
        setAddExerciseBtn(false);
      }
    }
    setForms(updatedForms);
  }

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const formatDate = date => new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

  const date = new Date();
  const currentDate = formatDate(date);
  const weekFromNow = addDays(date, 7);
  const maxDate = formatDate(weekFromNow);

  return (
    <Fragment>
      <Header
        title='Create Workouts'
        displayName={ displayName }
        signOut={() => signOut()}
      />
      { forms.map((form, i) => {
        form['valuesPos'] = i;

        return (
          <form className={`create-workouts__form ${((!addWorkoutBtn && forms.length === i + 1) ? 'create-workouts__form--last-form': '' )}`} key={ i }>
            <TextInput
              className='create-workouts'
              type='text'
              inputName='name'
              placeholder='eg Monday or Chest or Upper'
              labelText='Workout Name'
              onChange={handleFormChange}
              values={ values }
              errors={ errors }
              valuesPos={ i }
            />
            <label className='create-workouts__label' htmlFor='startDate'>Start Date</label>
            <input className='create-workouts__input' type='date' name='startDate' min={ currentDate } max={ maxDate } onChange={(e) => handleFormChange(e, i)} />
            <p className='create-workouts__exercises-header'>Exercises</p>
            { form.exercises.map((exercise, i) => {
              return (
                <select name={`exercise ${i}`} className='create-workouts__input' key={ i } onChange={(e) => handleSelectChange(e, i, form.valuesPos)}>
                  <option>{exercise}</option>
                  { exercises.map((exercise, i) => {
                    const optgroups = Object.keys(exercise);
                    const options = Object.values(exercise)[0];
                    return (
                      optgroups.map(optgroup => {
                        return (
                          <optgroup label={optgroup} key={ i }>
                            { options.map((option, i) => {
                              return (
                                <option key={ i }>{ option }</option>
                              )
                            })}
                          </optgroup>
                        )
                      })
                      )
                  })}
                </select>
              )
            })}
            <button className='create-workouts__btn' onClick={e => addExerciseDropdown(e, forms, i)}>Add Exercise</button>
          </form>
        )
      })}
      { addWorkoutBtn && (
        <button className='create-workouts__btn create-workouts__btn--add-workout' onClick={e => addWorkout(e)}>Add Workout</button>
      )}
      <div className='create-workouts__submit-workouts'>
        <button className='create-workouts__btn create-workouts__btn--submit' onClick={e => createWorkouts(e)}>Create Workouts</button>
      </div>
    </Fragment>
  )
};

export default CreateWorkouts;
