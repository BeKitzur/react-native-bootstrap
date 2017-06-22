import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';

export default class DisabledButton extends Component {
    render() {
        return (
            <Button title="Default Button" onPress={()=>{}} disabled={true} />
        );
    }
}

const styles = StyleSheet.create({});