import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet, TouchableOpacity } from 'react-native';

import data from '../../categories';

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.categories),
        };
        this.goToSubcategories = this.goToSubcategories.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
    }

    static navigationOptions = {
        title: 'Components'
    };

    goToSubcategories(category) {
        this.props.navigation.navigate('examplesList', { category });
    }

    renderCategory(category) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.goToSubcategories(category)}>
                <Text style={styles.rowTitle}>{ category.title }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCategory} />
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