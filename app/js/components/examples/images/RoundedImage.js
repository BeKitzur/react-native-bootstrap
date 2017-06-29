import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ImageView } from '../../lib';

export default class RoundedImage extends Component {
    render() {
        return (
            <ImageView
                style={styles.image}
                source={require('../../../../assets/images/example2.jpg')}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 50,
    }
});