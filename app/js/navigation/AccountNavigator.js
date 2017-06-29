import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../components/screens/login/Login';
import Account from '../components/screens/account/Account';

import { COLORS } from '../constants/Theme';

const config = {
    routes: {
        login: {
            screen: Login,
            navigationOptions: (options) => setNavigationOptions(options)
        },
        account: {
            screen: Account,
            navigationOptions: (options) => setNavigationOptions(options)
        }
    },
    navigator: {}
};

function setNavigationOptions({ navigation, screenProps, navigationOptions }) {
    let { appTheme } = screenProps;

    return {
        headerTintColor: COLORS[appTheme].foreground,
        headerStyle: {
            backgroundColor: COLORS[appTheme].accent,
        },
        headerTitleStyle: {
            color: COLORS[appTheme].foreground
        },
        headerBackTitleStyle: {
            backgroundColor: COLORS[appTheme].foreground,
            color: COLORS[appTheme].foreground
        },
        headerBackTitle: null
    };
}

export default StackNavigator(config.routes, config.navigator);