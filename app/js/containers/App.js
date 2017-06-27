import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';

class App extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    navigation: state.Navigation
});

export default connect(mapStateToProps)(App);

