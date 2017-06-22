import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';

export default class DefaultButton extends Component {
    render() {
        return (
            <Button title="Default Button" onPress={()=>{}} />
        );
    }
}

const styles = StyleSheet.create({});