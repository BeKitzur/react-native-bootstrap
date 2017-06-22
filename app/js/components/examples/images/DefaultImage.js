import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ResponsiveImage from '../../common/ResponsiveImage';

export default class DefaultImage extends Component {
    render() {
        return (
            <View>
                <ResponsiveImage source={ require('../../../../images/example.jpg') } />
            </View>
        );
    }
}

const styles = StyleSheet.create({});