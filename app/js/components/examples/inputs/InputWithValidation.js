import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

export default class InputWithValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isErrorVisible: false
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleChangeText(value) {
        this.setState({ value });
    }

    validateInput() {
        let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.value);

        if (!isValid) {
            this.setState({ isErrorVisible: true });
        } else {
            this.setState({ isErrorVisible: false });
        }
    }

    render() {
        let borderColor = this.state.isErrorVisible ? 'red' : '#ddd';

        return (
            <View>
                <View style={styles.container}>
                    <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
                        <TextInput
                            placeholder="Enter email"
                            underlineColorAndroid="transparent"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onBlur={this.validateInput}
                            onChangeText={(text) => this.handleChangeText(text)}
                            style={styles.input}
                        />
                    </View>
                    {
                        this.state.isErrorVisible ?
                            <Text style={styles.errorText}>Please, enter valid email address!</Text> :
                            null
                    }
                </View>
                <Text style={styles.exampleText}>e.g. example@example.com</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        marginBottom: 20,
    },
    inputContainer: {
        height: 36,
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    input: {
        height: 36,
        fontSize: 14,
        color: '#666'
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        position: 'absolute',
        top: 41,
        left: 0,
        right: 0
    },
    exampleText: {
        fontSize: 16,
        color: '#ccc'
    }
};