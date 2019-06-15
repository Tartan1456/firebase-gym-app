import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Workout from './workout';
import Exercise from './exercise';

class WorkoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutDays: [],
    }
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("users").where('uid', '==', this.props.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.collection('workouts').get().then(snapshot => {
          this.setState({
            workoutDays: snapshot.docs,
          })
        })
      })
    })
  }

  render() {
    const { workoutDays } = this.state;

    return (
      <div className='workouts-wrapper'>
        {workoutDays.map((workoutDay, i) => {
          const workoutLink = 'workout/' + workoutDay.id;

          return (
            <Link key={ i } to={ workoutLink }>
              <Workout
                { ...workoutDay.data()}
                key={ i }
                date={ workoutDay.data().date.toDate().toLocaleDateString() }
              >
                {workoutDay.data().exercises.map((exercise, i) => {
                  return (
                    <Exercise
                      key={ i }
                      { ...exercise }
                    />
                  );
                })}
              </Workout>
            </Link>
          )
        })}
      </div>
    )
  }
};

export default WorkoutContainer;
