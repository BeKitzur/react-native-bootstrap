import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MenuButton from './components/common/MenuButton';

import CategoriesList from './components/screens/CategoriesList';
import SubcategroiesList from './components/screens/SubcategroiesList';
import CategoryDetails from './components/screens/CategoryDetails';

import Login from './components/screens/Login';
import Account from './components/screens/Account';

const navigationConfig = {
    navigationOptions: (router) => ({
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#00ADEF' },
        headerLeft: <MenuButton navigation={router.navigation} />
    }),
};

const ExamplesNavigator = StackNavigator({
    categories: {
        screen: CategoriesList
    },
    examplesList: {
        screen: SubcategroiesList
    },
    exampleDetails: {
        screen: CategoryDetails
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