import React, { Component } from 'react';

class WeeklyReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            positives: "What went well?",
            negatives: "What could have been better?"
        };
        this.toggleReview = this.toggleReview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePositives = this.handleChangePositives.bind(this);
        this.handleChangeNegatives = this.handleChangeNegatives.bind(this);

    }

    toggleReview() {
        const { active } = this.state;
        this.setState({ active: !active })
    }

    handleSubmit(e) {
        const { week, createWeek } = this.props;
        const { positives, negatives } = this.state;
        const updatedWeek = {...week, review: { positives, negatives }};

        e.preventDefault();

        const options = {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updatedWeek)
        }

        fetch(`/weeks/${week.id}`, options)
            .then(createWeek);
    }

    handleChangePositives(event) {
        this.setState({ positives: event.target.value });
    }

    handleChangeNegatives(event) {
        this.setState({ negatives: event.target.value });
    }

    render() {
        const { active, positives, negatives } = this.state;
        const display = active
            ? (
                <form>
                    <h3>What went well this week?</h3>
                    <textarea onChange={this.handleChangePositives} value={positives}></textarea>
                    <h3>What do I need to work on next week?</h3>
                    <textarea onChange={this.handleChangeNegatives} value={negatives}></textarea>
                    <br></br>
                    <button onClick={this.handleSubmit}>Finish week</button>
                    <button onClick={this.toggleReview}>Cancel weekly review</button>
                </form>
            )
            : <button onClick={this.toggleReview}>Start weekly review</button>;

        return display;
    }
}

export default WeeklyReview;