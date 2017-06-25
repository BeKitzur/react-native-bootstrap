import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MenuButton from './components/common/MenuButton';

import Categories from './components/screens/lists/Categories';
import Examples from './components/screens/lists/Examples';
import Example from './components/screens/example/Example';

import Login from './components/screens/login/Login';
import Account from './components/screens/account/Account';

const navigationConfig = {
    navigationOptions: (router) => ({
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#00ADEF' },
        headerLeft: <MenuButton navigation={router.navigation} />
    }),
};

const ExamplesNavigator = StackNavigator({
    categoriesList: {
        screen: Categories
    },
    examplesList: {
        screen: Examples
    },
    exampleDetails: {
        screen: Example
    }
}, navigationConfig);

const AccountNavigator = StackNavigator({
    login: {
        screen: Login
    },
    account: {
        screen: Account
    }
}, {
    ...navigationConfig,
    mode: 'modal'
});

const ReactNativeBootstrap = DrawerNavigator({
    account: {
        screen: AccountNavigator
    },
    examples: {
        screen: ExamplesNavigator
    },
});

AppRegistry.registerComponent('ReactNativeBootstrap', () => ReactNativeBootstrap);