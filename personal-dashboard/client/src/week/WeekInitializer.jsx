import React, { Component } from 'react';
import Checkbox from '../Checkbox';

class WeekInitializer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHabits: null,
      checkedItems: new Map()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/habits')
      .then(res => res.json())
      .then(allHabits => this.setState({ allHabits }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { initializeWeek, week } = this.props;
    console.log(this.state.checkedItems);
    const habits = [];
    this.state.checkedItems.forEach((_, key) => {
      habits.push(key);
    });
    const plannedWeek = {...week, ...this.setUpWeekData(habits), initialized: true};
    initializeWeek(plannedWeek);
  }

  handleChange(event) {
    const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
  }

  setUpWeekData(habits) {
    const result = [];
    for(let i=0; i<habits.length; i++) {
      result.push({
        title: habits[i],
        completed: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        },
      });
    }
    return {
      habits: result,
    };
  }

  render() {
    const { allHabits } = this.state;
    const displayForm = allHabits
      ? (
        <form onSubmit={this.handleSubmit}>
        <h3>What habits do you want to focus on this week?</h3>
          {allHabits.map((habit, index) => {
            return (
              <>
                <label key={`checkbox${index}`}>
                  {habit.title}
                  <Checkbox name={habit.title} checked={this.state.checkedItems.get(habit.title)} onChange={this.handleChange} />
                </label>
                <br />
              </>
            )
          })}
          <input type="submit" value="Finish weekly planning" />
        </form>
      )
      : <p>loading habits...</p>
    return (
      <>
        <h1>New week, new possibilities!</h1>
        {displayForm}
      </>
    );
  }
}

export default WeekInitializer;