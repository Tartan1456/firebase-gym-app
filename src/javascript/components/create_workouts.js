import React, { Fragment, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Header from './header';
import TextInput from './text_input';

function CreateWorkouts({displayName, signOut}) {
  const [forms, setForms] = useState([{exercises: []}]);
  const [exercises, setExercises] = useState([{}]);
  const [addWorkoutBtn, setAddWorkoutBtn] = useState(true);
  const [addExerciseBtn, setAddExerciseBtn] = useState(true);
  const [values, setValues] = useState({});
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
      })
    });
  }, []);

  const handleChange = (e) => {
    return setValues({...values, [e.target.name]: e.target.value })
  }

  const createWorkouts = (e) => {
    console.log(values);
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (forms.length < 5) {
      setForms([...forms, {exercises: []}]);
    
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
        return (
          <form className={`create-workouts__form ${((!addWorkoutBtn && forms.length === i + 1) ? 'create-workouts__form--last-form': '' )}`} key={ i }>
            <TextInput
              className='create-workouts'
              type='text'
              inputName='name'
              placeholder='eg Monday or Chest or Upper'
              labelText='Workout Name'
              onChange={handleChange}
              values={ values }
              errors={ errors }
            />
            <label className='create-workouts__label' htmlFor='startDate'>Start Date</label>
            <input className='create-workouts__input' type='date' name='startDate' defaultValue={currentDate} min={ currentDate } max={ maxDate } onChange={handleChange} />
            <p className='create-workouts__exercises-header'>Exercises</p>
            { form.exercises.map((exercise, i) => {
              return (
                <select name='exercise' className='create-workouts__input' key={ i } onChange={handleChange}>
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