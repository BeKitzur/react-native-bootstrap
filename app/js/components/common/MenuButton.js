import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DrawerButton extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let backButtonIsVisible = !(/categories|account|login/.test(this.props.navigation.state.routeName)),
            isIOS = Platform.OS === 'ios';

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.openDrawer} style={styles.button}>
                    <Icon name="menu" size={25} color="white" />
                </TouchableOpacity>

                {
                    isIOS && backButtonIsVisible ?
                    <TouchableOpacity onPress={this.goBack} style={styles.button}>
                        <Icon name="arrow-left" size={25} color="white" />
                    </TouchableOpacity> :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        paddingHorizontal: 10
    }
});