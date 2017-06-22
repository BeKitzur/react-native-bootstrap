import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import CategoriesList from './components/CategoriesList';
import SubcategroiesList from './components/SubcategroiesList';
import CategoryDetails from './components/CategoryDetails';

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