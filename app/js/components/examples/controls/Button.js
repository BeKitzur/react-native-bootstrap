import React, { Component } from 'react';
import { Button, TextView } from '../../lib';

export default class DefaultButton extends Component {
    render() {
        return (
            <Button onPress={()=>{}}>
                <TextView>Default button</TextView>
            </Button>
        );
    }
}