import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import examples from '../examples/index';

export default class CategoriesList extends Component {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});