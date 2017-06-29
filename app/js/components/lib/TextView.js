import React, { Component, PureComponent, PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Theme';

export default class TextView extends Component {
    static contextTypes = {
        getCurrentTheme: PropTypes.func
    };

    render() {
        let appTheme = this.context.getCurrentTheme();

        return (
            <Text
                {...this.props}
                style={[
                    styles.text,
                    { color: COLORS[appTheme].foreground },
                    this.props.style
                ]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    }
});

