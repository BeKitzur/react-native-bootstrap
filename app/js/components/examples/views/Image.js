import React, { Component } from 'react';
import { ImageView } from '../../lib';

export default class Image extends Component {
    render() {
        return (
            <ImageView source={ require('../../../../assets/images/example.jpg') } />
        );
    }
}
