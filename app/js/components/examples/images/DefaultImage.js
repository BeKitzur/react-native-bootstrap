import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageView } from '../../lib';

export default class DefaultImage extends Component {
    render() {
        return (
            <ImageView source={ require('../../../../assets/images/example.jpg') } />
        );
    }
}

const styles = StyleSheet.create({});