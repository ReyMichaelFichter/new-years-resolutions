import React, { Component } from 'react';
import DailyHabitTracker from './DailyHabitTracker.jsx';
import WeeklyReview from './WeeklyReview.jsx';

class WeeklyPlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { week, fetchWeeks, createWeek } = this.props;
        
        const display = week
        ? (
            <>
                <DailyHabitTracker week={week} fetchWeeks={fetchWeeks} />
                <WeeklyReview week={week} createWeek={createWeek} />
            </>
        )
        : <p>loading...</p>;

        return (
            display
        )
    }
}

export default WeeklyPlanner;
