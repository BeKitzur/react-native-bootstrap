import React, { Component } from 'react';
import { Image, View } from 'react-native';

export default class ResponsiveImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aspectRatio: null,
            style: {}
        };
        this.computeImageSize = this.computeImageSize.bind(this);
    }

    componentDidMount() {
        this.computeImageSize();
    }

    computeImageSize() {
        this.refs.imageElement.measure((ox, oy, width, height) => {
            let aspectRatio = width / height;

            this.refs.imageContainer.measure((ox, oy, width) => {
                let computedHeight = width / aspectRatio;

                this.setState({
                    style: {
                        height: computedHeight,
                        width
                    }
                });
            });
        });
    }

    render() {
        return (
            <View ref="imageContainer" collapsable={false} onLayout={this.computeImageSize}>
                <Image {...this.props}
                       ref="imageElement"
                       style={[this.props.style, this.state.style]} />
            </View>
        );
    }
}