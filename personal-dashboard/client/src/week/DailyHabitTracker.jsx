import React, { Component } from 'react';

class DailyHabitTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleHabit(habit,day) {
        const { week, fetchWeeks } = this.props;
        const updatedWeek = {...week};
        updatedWeek.habits[habit].completed[day] = !updatedWeek.habits[habit].completed[day];
        const options = {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updatedWeek)
        }
        console.log(updatedWeek);
        console.log(week.id);
        fetch(`/weeks/${week.id}`, options)
            .then(fetchWeeks);
    }

    render() { 
        const { week: { habits } } = this.props;
        const display = habits
            ? (
                <table>
                    <tbody>
                        <tr>
                            <th>Habit</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                        {habits.map((habit, index) => {
                            return (<tr>
                                <td>{habit.title}</td>
                                <td className={habit.completed.mon ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "mon")}></td>
                                <td className={habit.completed.tue ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "tue")}></td>
                                <td className={habit.completed.wed ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "wed")}></td>
                                <td className={habit.completed.thu ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "thu")}></td>
                                <td className={habit.completed.fri ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "fri")}></td>
                                <td className={habit.completed.sat ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "sat")}></td>
                                <td className={habit.completed.sun ? "completed" : "not-completed"} onClick={() => this.toggleHabit(index, "sun")}></td>       
                            </tr>)
                        })}
                    </tbody>
                </table>
            )
            : <p>loading...</p>

        return (display);
    }
}
 
export default DailyHabitTracker;