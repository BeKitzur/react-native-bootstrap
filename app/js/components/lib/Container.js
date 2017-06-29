import React, { Component, PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Theme';

export default class Container extends Component {
    static contextTypes = {
        getCurrentTheme: PropTypes.func
    };

    render() {
        let appTheme = this.context.getCurrentTheme();

        return (
            <View style={[styles.container, this.props.style, {backgroundColor: COLORS[appTheme].background}]}>
                { this.props.children }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    }
});