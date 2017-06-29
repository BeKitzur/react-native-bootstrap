import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField, TextView } from '../../lib';

export default class InputWithValidation extends Component {
    render() {
        return (
            <View>
                <TextField
                    placeholder="Email address"
                    onInputChange={() => {}}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    invalidValueMessage="Please, enter valid email address!"
                    regex={emailRegex}
                />
                <TextView style={styles.exampleText}>e.g. example@example.com</TextView>
            </View>
        );
    }
}

const styles = {
    exampleText: {
        color: '#ccc'
    }
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;