import React, { Component, PropTypes } from 'react';
import { DatePickerAndroid, TouchableOpacity, Text } from 'react-native';
import TextView from '../TextView';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date
        };
        this.showDatePicker = this.showDatePicker.bind(this);
    }

    static propTypes = {
        date: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
        textLabelStyles: PropTypes.object
    };

    async showDatePicker() {
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: this.state.date
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: new Date(year, month, day)
            }, this.props.onSubmit(this.state.date));
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.showDatePicker}>
                <TextView style={this.props.textLabelStyles}>
                    { this.state.date.toLocaleDateString() }
                </TextView>
            </TouchableOpacity>
        );
    }
}