import React, { Component } from 'react';
import { DatePicker } from '../../lib';

export default class DatePickerExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    render() {
        return (
            <DatePicker
                date={this.state.date}
                onSubmit={(date) => this.setState({date})}
            />
        );
    }
}