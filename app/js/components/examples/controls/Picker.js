import React, { Component } from 'react';
import { Picker } from '../../lib';

export default class DefaultPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
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
        return (
            <Picker
                selectedItem={this.state.selected}
                items={this.state.items}
                onSubmit={(selected) => this.setState({ selected })}
            />
        );
    }
}