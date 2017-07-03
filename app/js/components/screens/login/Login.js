import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import { TextField, TextView, Container, Button, Spinner } from '../../lib';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../../actions/User';

class Login extends Component {
    constructor(props) {
        super(props);
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
        this.props.actions.user.logIn(
            this.refs.userEmail.value,
            this.refs.userPassword.value,
            this.goToAccountScreen
        );
    }

    render() {
        if (this.props.user.inProgress) {
            return (
                <Container style={styles.checkingContainer}>
                    <Spinner size="large" />
                </Container>
            );
        } else {
            return (
                <Container>
                    <View style={styles.form}>
                        <TextField
                            placeholder="email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            invalidValueMessage="Please, enter valid email address!"
                            ref="userEmail"
                            defaultValue={this.props.user.account.username}
                            regex={emailRegex}
                        />

                        <TextField
                            placeholder="password"
                            secureTextEntry={true}
                            ref="userPassword"
                            defaultValue={this.props.user.account.password}
                        />

                        <Button onPress={this.doLogin}>
                            <TextView>Log In</TextView>
                        </Button>

                        <TextView style={styles.errorText}>{ this.props.user.error }</TextView>
                    </View>
                </Container>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.User
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            user: bindActionCreators(UserActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
