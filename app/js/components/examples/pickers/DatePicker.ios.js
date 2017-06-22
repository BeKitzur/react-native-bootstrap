import React, { Component } from 'react';
import MyDatePickerIOS from '../../common/MyDatePickerIOS';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    render() {
        return (
            <MyDatePickerIOS
                date={this.state.date}
                onSubmit={(date) => this.setState({date})}
            />
        );
    }
}