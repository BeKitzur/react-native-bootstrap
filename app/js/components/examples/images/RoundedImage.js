import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import ResponsiveImage from '../../common/ResponsiveImage';

export default class RoundedImage extends Component {
    render() {
        return (
            <ResponsiveImage style={styles.image} source={require('../../../../images/example2.jpg')} />
        );
    }
}

const styles = {
    image: {
        width: 200,
        height: 200,
        borderRadius: 170,
    }
};