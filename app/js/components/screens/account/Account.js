import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, NativeModules } from 'react-native';
import { TextView, Container, Button } from '../../lib';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
import api from '../../../api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../../../actions/User';
import * as GlobalActions from '../../../actions/Global';

class Account extends Component {
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
        this.props.actions.user.logOut(this.goToLoginScreen);
    }

    render() {
        return (
            <Container style={styles.container}>
                <TextView style={styles.loggedInText}>You are logged in!</TextView>
                <Button onPress={this.doLogout} style={styles.button}>
                    {
                        this.state.doingLogout ?
                            <ActivityIndicator color="#00ADEF" /> :
                            <TextView>Log out</TextView>
                    }
                </Button>

                <Button
                    onPress={() => this.props.actions.global.changeTheme(this.props.global.appTheme === 'light' ? 'dark' : 'light')}
                    style={[styles.button, {marginTop: 30}]}>
                    <TextView>Press Me</TextView>
                </Button>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {
        global: state.Global
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            global: bindActionCreators(GlobalActions, dispatch),
            user: bindActionCreators({ logOut }, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
