import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isFocused: false,
            isValid: true
        };

        this.handleInput = this.handleInput.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.setHairlineColor = this.setHairlineColor.bind(this);
    }

    onFocus() {
        this.setState({ isFocused: true }, this.setHairlineColor);
    }

    handleInput(value) {
        this.setState({ value }, this.props.onInputChange(value));
    }

    validateInput() {
        const updateState = obj => this.setState(obj, this.setHairlineColor);

        updateState({ isFocused: false});

        if (this.props.regex && this.state.value) {
            let regex = new RegExp(this.props.regex);

            if (regex.test(this.state.value)) {
                updateState({ isValid: true });
            } else {
                updateState({ isValid: false });
            }
        }
    }

    setHairlineColor() {
        const setBorderColor = borderBottomColor => this.refs.inputContainer.setNativeProps({style: { borderBottomColor }});

        if (this.state.isFocused) {
            setBorderColor(this.state.isValid ? '#00ADEF' : 'red');
        } else {
            setBorderColor(this.state.isValid ? '#dadada' : 'red');
        }
    }

    renderErrorMessage(message) {
        return (
            <Text style={styles.errorText}>
                { message }
            </Text>
        );
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.inputContainer} ref="inputContainer">
                        <TextInput
                            {...this.props}
                            underlineColorAndroid="transparent"
                            onFocus={this.onFocus}
                            onEndEditing={this.validateInput}
                            onSubmitEditing={this.validateInput}
                            onChangeText={this.handleInput}
                            style={styles.input}
                        />
                    </View>

                    { this.state.isValid ?
                        null :
                        this.renderErrorMessage(this.props.invalidValueMessage) }
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputContainer: {
        height: 36,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada'
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
        left: 10,
        right: 10
    }
};