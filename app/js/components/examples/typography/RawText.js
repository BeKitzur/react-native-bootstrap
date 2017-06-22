import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class RawText extends Component {
    render() {
        return (
            <View>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, laboriosam magni odit officiis quam qui quod? Assumenda explicabo ipsam itaque quaerat saepe sit voluptates? Dignissimos est fugit harum labore.</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ducimus magnam nisi officia repellat. Blanditiis consequatur, debitis, doloremque earum eum iste modi molestiae nihil nostrum numquam quos repudiandae sit ut.</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A autem beatae consequatur deserunt dolorem doloremque ducimus eaque facilis labore magni modi obcaecati ratione rem, repellat reprehenderit suscipit temporibus velit! Eaque.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});