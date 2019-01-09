import React, { Component } from 'react';
import WeeklyPlanner from './WeeklyPlanner';
import WeekInitializer from './WeekInitializer';

class WeekApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayWeek = this.displayWeek.bind(this);
    this.fetchWeeks = this.fetchWeeks.bind(this);
    this.createWeek = this.createWeek.bind(this);
    this.initializeWeek = this.initializeWeek.bind(this);
    this.displayLatestWeek = this.displayLatestWeek.bind(this);
  } 

  componentDidMount() {
    this.displayLatestWeek();
  }

  displayLatestWeek() {
    this.fetchWeeks()
      .then(() => this.displayWeek(this.state.weeks[this.state.weeks.length -1]));
  }

  displayWeek(activeWeek) {
    this.setState({ activeWeek });
  }

  fetchWeeks() {
    return fetch('/weeks')
      .then(res => res.json())
      .then(weeks => this.setState({ weeks }));
  }

  createWeek() {
    const options = {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({initialized: false})
    }
    fetch('/weeks', options)
      .then(this.displayLatestWeek);
  }

  initializeWeek(week) {
    const options = {
      method:'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(week)
    }
    fetch(`/weeks/${week.id}`, options)
      .then(this.displayLatestWeek);
  }

  render() {
    const { weeks, activeWeek } = this.state;

    const allWeeks = weeks
    ? (<ul>
      {weeks.map(week => {
        return week === activeWeek
        ? <li className="highlight-list-item" onClick={() => this.displayWeek(week)}>Week {week.id}</li>
        : <li onClick={() => this.displayWeek(week)}>Week {week.id}</li>;
      })}
    </ul>)
    : <p>loading...</p>;

    let currentWeek;
    if (activeWeek) {
      currentWeek = activeWeek.initialized
      ? (
        <WeeklyPlanner week={activeWeek} fetchWeeks={this.fetchWeeks} createWeek={this.createWeek}/>
      )
      : <WeekInitializer week={activeWeek} initializeWeek={this.initializeWeek} />;
    } else {
      currentWeek = <p>loading...</p>;
    }

    return(
      <>
        {allWeeks}
        {currentWeek}
      </>
    )
  }
}

export default WeekApp;