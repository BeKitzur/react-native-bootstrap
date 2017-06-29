import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TabNavigator } from 'react-navigation';
import TabBar from './components/TabBar';

import AccountNavigator from './AccountNavigator';
import ComponentsNavigator from './ComponentsNavigator';

import { COLORS } from '../constants/Theme';

const isIOS = Platform.OS === 'ios';

const config = {
    routes: {
        account: {
            screen: AccountNavigator,
            navigationOptions: (options) => setNavigationOptions('Account', 'contact', options)
        },
        components: {
            screen: ComponentsNavigator,
            navigationOptions: (options) => setNavigationOptions('Components', 'cube', options)
        }
    },
    navigator: {
        initialRouteName: 'account',
        tabBarPosition: 'bottom',
        tabBarComponent: TabBar,
        tabBarOptions: {
            showLabel: isIOS,
            showIcon: true,
            tabStyle: {
                padding: 10
            },
            labelStyle: {
                marginTop: -6,
                marginBottom: 5,
                fontSize: 12
            }
        }
    }
};

function setNavigationOptions(tabBarLabel, iconName, { navigation, screenProps, navigationOptions }) {
    let { appTheme } = screenProps,
        iconColor  = COLORS[appTheme].foreground;

    return {
        tabBarLabel,
        tabBarIcon: ({ focused }) =>  {
            if (isIOS) {
                return focused ?
                    getIcon('ios-' + iconName, iconColor) :
                    getIcon('ios-' + iconName + '-outline', iconColor);
            }
            else {
                return getIcon('md-' + iconName, iconColor);
            }
        }
    };
}

function getIcon(iconName, iconColor) {
    return (
        <Icon
            name={iconName}
            size={25}
            color={iconColor}
        />
    );
}

export default TabNavigator(config.routes, config.navigator);