import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class Examples extends Component {
    constructor(props) {
        super(props);
        this.goToCategory = this.goToCategory.bind(this);
        this.renderSubcategory = this.renderSubcategory.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.category.title,
    });

    goToCategory(category, subcategory) {
        this.props.navigation.navigate('example', {
            category,
            subcategory
        });
    }

    renderSubcategory({ item }) {
        let { category } = this.props.navigation.state.params;

        return (
            <TouchableOpacity style={styles.row} onPress={() => this.goToCategory(category.title, item)}>
                <Text style={styles.rowTitle}>{ item }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.navigation.state.params.category.subcategories}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderSubcategory} />
            </View>
        );
    }
}
