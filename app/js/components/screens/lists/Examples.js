import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TextView, Container } from '../../lib';
import styles from './styles';

export default class Examples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCondition: Math.random()
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

    renderSubcategory({ item }) {
        let { category } = this.props.navigation.state.params;

        return (
            <TouchableOpacity style={styles.row} onPress={() => this.goToCategory(category.title, item)}>
                <TextView style={styles.rowTitle}>{ item }</TextView>
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
                    data={this.props.navigation.state.params.category.subcategories}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderSubcategory} />
            </Container>
        );
    }
}
