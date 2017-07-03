import React, { Component, PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppNavigator from '../navigation/AppNavigator';
import * as NavigationActions from '../actions/Navigation';
import { getAuthenticatedAccount } from '../actions/User';
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
    getChildContext() {
        return {
            getCurrentTheme: () => this.props.global.appTheme
        };
    }

    static childContextTypes = {
        getCurrentTheme: PropTypes.func
    };

    componentDidMount() {
        this.props.actions.user.getAuthenticatedAccount()
            .then(() => {
                SplashScreen.hide();
                return this.props.user.authenticated ?
                    this.props.actions.navigation.setInitialRoute('account') :
                    null;
            });
    }

    render() {
        return (
            <AppNavigator
                screenProps={{appTheme: this.props.global.appTheme}}
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    navigation: state.Navigation,
    global: state.Global,
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    actions: {
        navigation: bindActionCreators(NavigationActions, dispatch),
        user: bindActionCreators({ getAuthenticatedAccount }, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
