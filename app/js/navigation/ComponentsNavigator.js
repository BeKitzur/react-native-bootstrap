import { StackNavigator } from 'react-navigation';

import Categories from '../components/screens/lists/Categories';
import Examples from '../components/screens/lists/Examples';
import Example from '../components/screens/example/Example';

import { COLORS } from '../constants/Theme';


const config = {
    routes: {
        categories: {
            screen: Categories,
            navigationOptions: (options) => setNavigationOptions(options)
        },
        examples: {
            screen: Examples,
            navigationOptions: (options) => setNavigationOptions(options)
        },
        example: {
            screen: Example,
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