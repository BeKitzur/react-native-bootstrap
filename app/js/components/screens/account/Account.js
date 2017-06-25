import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
import api from '../../../api';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doingLogout: false
        };
        this.doLogout = this.doLogout.bind(this);
        this.goToLoginScreen = this.goToLoginScreen.bind(this);
    }

    static navigationOptions = {
        title: 'Account'
    };

    goToLoginScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'login'})
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    doLogout() {
        if (this.state.doingLogout) return;

        this.setState({ doingLogout: true });
        api.logout()
            .then(() => {
                this.setState({ doingLogout: false });
                AsyncStorage.removeItem('user');

                this.goToLoginScreen();
            })
            .catch((err) => {
                this.setState({ doingLogout: false });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loggedInText}>Your are logged in!</Text>
                <TouchableOpacity onPress={this.doLogout} style={styles.button}>
                    {
                        this.state.doingLogout ?
                            <ActivityIndicator color="#00ADEF" /> :
                            <Text style={styles.buttonText}>Log Out</Text>
                    }
                </TouchableOpacity>
            </View>
        );
    }
}
