import React, { Component } from 'react';
import { Platform, Picker } from 'react-native';
import PickerIOS from '../../common/PickerIOS';

export default class DefaultPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: { label: 'PHP', value: 5 },
            items: [
                { label: 'Java', value: 0 },
                { label: 'JavaScript', value: 1 },
                { label: 'Scala', value: 2 },
                { label: 'Python', value: 3 },
                { label: 'PHP', value: 4 },
            ]
        };
    }

    render() {
        console.log(Platform);
        if (Platform.OS === 'ios') {
            return (
                <PickerIOS items={this.state.items}
                           selectedItem={this.state.selected}
                           onSubmit={(optionIndex) => this.setState({ selected: this.state.items[optionIndex]})} />
            );
        } else {
            return (
                <Picker selectedValue={this.state.selected} onValueChange={(option) => this.setState({ selected: option })}>
                    { this.state.items.map((option, index) => (
                        <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value} />
                    )) }
                </Picker>
            );
        }
    }
}