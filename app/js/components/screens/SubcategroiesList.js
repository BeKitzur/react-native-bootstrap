import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet, TouchableOpacity } from 'react-native';

import CategoryDetails from './CategoryDetails';

export default class SubcategoriesList extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.navigation.state.params.category.subcategories || []),
        };

        this.goToCategory = this.goToCategory.bind(this);
        this.renderSubcategory = this.renderSubcategory.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.category.title,
    });

    goToCategory(category, subcategory) {
        this.props.navigation.navigate('categoryDetails', {
            category,
            subcategory
        });
    }

    renderSubcategory(subcategory) {
        let { category } = this.props.navigation.state.params;

        return (
            <TouchableOpacity style={styles.row} onPress={() => this.goToCategory(category.title, subcategory)}>
                <Text style={styles.rowTitle}>{ subcategory }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView dataSource={this.state.dataSource}
                      renderRow={this.renderSubcategory} />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    rowTitle: {
        fontSize: 16,
        color: '#666'
    }
});