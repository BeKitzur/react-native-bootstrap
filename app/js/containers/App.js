import React, { Component, PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';

class App extends Component {
    getChildContext() {
        return {
            getCurrentTheme: () => this.props.global.appTheme
        };
    }

    static childContextTypes = {
        getCurrentTheme: PropTypes.func
    };

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
    global: state.Global
});

export default connect(mapStateToProps)(App);

