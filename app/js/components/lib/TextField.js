import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS } from '../../constants/Theme';

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

    static contextTypes = {
        getCurrentTheme: PropTypes.func
    };

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
        let appTheme = this.context.getCurrentTheme();
        const setBorderColor = borderBottomColor => this.refs.inputContainer.setNativeProps({style: { borderBottomColor }});

        if (this.state.isFocused) {
            setBorderColor(this.state.isValid ? COLORS[appTheme].foreground : 'red');
        } else {
            setBorderColor(this.state.isValid ? COLORS[appTheme].accent : 'red');
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
        let appTheme = this.context.getCurrentTheme();

        return (
            <View>
                <View style={styles.container}>
                    <View style={[styles.inputContainer, { borderBottomColor: COLORS[appTheme].accent}]} ref="inputContainer">
                        <TextInput
                            {...this.props}
                            placeholderTextColor={COLORS[appTheme].foreground}
                            underlineColorAndroid="transparent"
                            onFocus={this.onFocus}
                            onEndEditing={this.validateInput}
                            onSubmitEditing={this.validateInput}
                            onChangeText={this.handleInput}
                            style={[styles.input, { color: COLORS[appTheme].foreground }]}
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
        marginBottom: 20,
    },
    inputContainer: {
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    input: {
        height: 40,
        fontSize: 18,
        color: '#666'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0
    }
};