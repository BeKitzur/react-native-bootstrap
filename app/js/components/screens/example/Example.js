import React, { Component } from 'react';
import { Container, TextView } from '../../lib';

import styles from './styles';
import examples from '../../examples/index';

export default class Example extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.subcategory
    });

    render() {
        let { category, subcategory } = this.props.navigation.state.params;

        let categoryName = category.replace(/\s/g, ''),
            componentName = subcategory.replace(/\s/g, ''),
            component = examples[categoryName][componentName];

        return (
            <Container style={styles.container}>
                { component || <TextView>Component not found :(</TextView> }
            </Container>
        );
    }
}