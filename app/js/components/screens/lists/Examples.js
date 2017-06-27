import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class Examples extends Component {
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
        this.props.navigation.navigate('example', {
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
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderSubcategory} />
            </View>
        );
    }
}
