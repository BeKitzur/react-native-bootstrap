import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import examples from '../../examples/index';

export default class Example extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.subcategory
    });

    render() {
        let { category, subcategory } = this.props.navigation.state.params;
        console.log(category, subcategory);

        let categoryName = category.replace(/\s/g, ''),
            componentName = subcategory.replace(/\s/g, ''),
            component = examples[categoryName][componentName];

        return (
            <View style={styles.container}>
                { component || <View><Text>Component not found :(</Text></View> }
            </View>
        );
    }
}