import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { TextView } from '../../lib';

export default class DefaultSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(value) {
        this.setState({
            isActive: value
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch
                    value={this.state.isActive}
                    onValueChange={this.toggle}
                    onTintColor="#00ADEF"
                />
                <TextView style={styles.text}>Default Switch</TextView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 20
    }
});