import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { TextView, Container } from '../../lib';

import styles from './styles';
import data from '../../../categories';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.goToSubcategories = this.goToSubcategories.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
    }

    static navigationOptions = {
        title: 'Components'
    };

    goToSubcategories(category) {
        this.props.navigation.navigate('examples', { category });
    }

    renderCategory({ item }) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.goToSubcategories(item)}>
                <TextView>{ item.title }</TextView>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Container>
                <FlatList
                    data={data.categories}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCategory} />
            </Container>
        );
    }
}

export default Categories;