import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TextField from '../../common/TextField';

export default class InputWithValidation extends Component {
    render() {
        return (
            <View>
                <TextField
                    onInputChange={() => {}}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    invalidValueMessage="Please, enter valid email address!"
                    regex={emailRegex}
                />
                <Text style={styles.exampleText}>e.g. example@example.com</Text>
            </View>
        );
    }
}

const styles = {
    exampleText: {
        fontSize: 16,
        color: '#ccc'
    }
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;