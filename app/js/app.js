import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import CategoriesList from './components/screens/CategoriesList';
import SubcategroiesList from './components/screens/SubcategroiesList';
import CategoryDetails from './components/screens/CategoryDetails';

const ReactNativeBootstrap = StackNavigator({
    categories: {
        screen: CategoriesList
    },
    subcategories: {
        screen: SubcategroiesList
    },
    categoryDetails: {
        screen: CategoryDetails
    }
});

AppRegistry.registerComponent('ReactNativeBootstrap', () => ReactNativeBootstrap);