import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Theme';

export default class Button extends Component {
    static contextTypes = {
        getCurrentTheme: PropTypes.func
    };

    render() {
        let appTheme = this.context.getCurrentTheme();

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.button, {borderColor: COLORS[appTheme].accent}]}>
                { this.props.children }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 30,
        // borderColor: 'rgba(0,0,0,0.25)',
        borderRadius: 20
    }
});