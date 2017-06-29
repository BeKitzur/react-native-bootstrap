import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

import styles from './styles';
import api from '../../../api';
import { TextField, TextView, Container, Button } from '../../lib';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            doingLogin: false,
            checkingIsAuthenticated: false
        };
        this.doLogin = this.doLogin.bind(this);
        this.goToAccountScreen = this.goToAccountScreen.bind(this);
    }

    static navigationOptions = {
        title: 'Log In'
    };

    goToAccountScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'account'})
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    doLogin() {
        if (this.state.doingLogin) return;

        this.setState({ doingLogin: true });

        api.login(this.state.email, this.state.password)
            .then((user) => {
                user = {
                    uid: user.uid,
                    email: user.email,
                    refreshToken: user.refreshToken
                };

                this.setState({
                    doingLogin: false,
                    error: null
                });

                AsyncStorage.setItem('user', JSON.stringify(user));
                this.goToAccountScreen();
            })
            .catch((err) => {
                this.setState({
                    doingLogin: false,
                    error: err.message
                });
            });
    }

    componentDidMount() {
        this.setState({ checkingIsAuthenticated: true });

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ checkingIsAuthenticated: false });

            if (user) this.goToAccountScreen();
        });
    }

    render() {
        if (this.state.checkingIsAuthenticated) {
            return (
                <View style={styles.checkingContainer}>
                    <ActivityIndicator color="#00ADEF" size="large" />
                </View>
            );
        } else {
            return (
                <Container>
                    <View style={styles.form}>
                        <TextField
                            placeholder="email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onInputChange={value => this.setState({ email: value })}
                            invalidValueMessage="Please, enter valid email address!"
                            regex={emailRegex}
                        />

                        <TextField
                            placeholder="password"
                            secureTextEntry={true}
                            onInputChange={value => this.setState({password: value})}
                        />

                        <Button onPress={this.doLogin}>
                            {
                                this.state.doingLogin ?
                                    <ActivityIndicator color="white" /> :
                                    <TextView>Log In</TextView>
                            }
                        </Button>

                        <TextView style={styles.errorText}>{ this.state.error }</TextView>
                    </View>
                </Container>
            );
        }
    }
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;