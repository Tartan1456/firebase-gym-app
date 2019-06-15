import React from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Header from './header';
import SetsContainer from './sets_container';

class WorkoutDay extends React.Component {
  constructor(props) {
    super(props);

    this.workoutId = props.location.pathname.split('/')[2];

    this.state = {
      headerTitle: '',
      exercises: [],
    }
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("users").where('uid', '==', this.props.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.collection('workouts').doc(this.props.match.params.id).get().then(doc => {
          this.setState({
            headerTitle: doc.data().name,
            exercises: doc.data().exercises,
            date: doc.data().date.toDate().toLocaleDateString(),
          })
        })
      })
    })
  }

  render() {
    const { headerTitle, exercises, date } = this.state;
    return (
      <div>
        <Link to={ '/' }>
          <Header
            title={ headerTitle }
          />
        </Link>
        {exercises.map((exercise, i) => {
          return (
            <SetsContainer
              { ...exercise }
              date={ date }
              key={ i }
              i= { i }
            />
          );
        })}
        <Link to={ `${this.workoutId}/edit` }>
          <button>Edit</button>
        </Link>
      </div>
    )
  }
};

export default WorkoutDay;
