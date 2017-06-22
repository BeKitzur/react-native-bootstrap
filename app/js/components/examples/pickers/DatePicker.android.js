import React, { Component } from 'react';
import { DatePickerAndroid, TouchableOpacity, Text } from 'react-native';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.showDatePicker = this.showDatePicker.bind(this);
    }

    async showDatePicker() {
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date()
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: new Date(year, month, day)
            });
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.showDatePicker}>
                <Text>{ this.state.date.toLocaleDateString() }</Text>
            </TouchableOpacity>
        );
    }
}