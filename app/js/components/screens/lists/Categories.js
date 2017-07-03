import React, { Component, PureComponent } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { TextView, Container } from '../../lib';

import styles from './styles';
import data from '../../../categories';

class Categories extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            updateCondition: Math.random()
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

    renderCategory({ item }) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.goToSubcategories(item)}>
                <TextView>{ item.title }</TextView>
            </TouchableOpacity>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.screenProps.appTheme !== this.props.screenProps.appTheme) {
            this.setState({
                updateCondition: Math.random()
            });
        }
    }

    render() {
        return (
            <Container>
                <FlatList
                    data={data.categories}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCategory} />
            </Container>
        );
    }
}

export default Categories;