import React, { Component, PropTypes } from 'react';
import {
    Picker
} from 'react-native';

export default class PickerAndroid extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        selectedItem: PropTypes.number,
        onSubmit: PropTypes.func.isRequired,
        textLabelStyles: PropTypes.object
    };

    render() {
        return (
            <Picker
                selectedValue={this.props.items[this.props.selectedItem].value}
                onValueChange={(option) => this.props.onSubmit(option)}
                style={this.props.textLabelStyles}>
                { this.props.items.map((option, index) => (
                    <Picker.Item
                        key={index}
                        label={option.label}
                        value={option.value} />
                )) }
            </Picker>
        );
    }
}