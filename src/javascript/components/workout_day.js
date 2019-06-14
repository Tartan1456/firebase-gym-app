import React from 'react';
import { Link } from 'react-router-dom'

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
    fetch(`/api/workouts/${this.workoutId}`)
    .then(response => response.json())
    .then(response => {
      this.setState({
        headerTitle: response.muscleset,
        ...response,
      })
    });
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
