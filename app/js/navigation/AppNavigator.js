import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TabNavigator, TabBarBottom } from 'react-navigation';

import AccountNavigator from './AccountNavigator';
import ComponentsNavigator from './ComponentsNavigator';

const isIOS = Platform.OS === 'ios';

const config = {
    routes: {
        account: {
            screen: AccountNavigator,
            navigationOptions: {
                tabBarLabel: 'Account',
                tabBarIcon: ({ focused }) =>  {
                    if (isIOS) {
                        return focused ?
                            <Icon name="ios-contact" size={25} color="white" /> :
                            <Icon name="ios-contact-outline" size={25} color="white" />;
                    }
                    else {
                        return <Icon name="md-contact" size={25} color="white" />;
                    }
                }
            }
        },
        components: {
            screen: ComponentsNavigator,
            navigationOptions: {
                tabBarLabel: 'Components',
                tabBarIcon: ({ focused }) =>  {
                    if (isIOS) {
                        return focused ?
                            <Icon name="ios-cube" size={25} color="white" /> :
                            <Icon name="ios-cube-outline" size={25} color="white" />;
                    }
                    else {
                        return <Icon name="md-cube" size={25} color="white" />;
                    }
                }
            }
        }
    },
    navigator: {
        initialRouteName: 'account',
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        tabBarOptions: {
            showLabel: isIOS,
            showIcon: true,
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            pressColor: 'white',
            tabStyle: {
                padding: 10
            },
            labelStyle: {
                marginTop: -6,
                marginBottom: 5,
                fontSize: 12
            },
            style: {
                backgroundColor: '#00ADEF'
            }
        }
    }
};

export default TabNavigator(config.routes, config.navigator);