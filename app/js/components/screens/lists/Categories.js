import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';

import styles from './styles';
import data from '../../../categories';

export default class Categories extends Component {
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
        this.props.navigation.navigate('examples', { category });
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
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCategory} />
            </View>
        );
    }
}