import { StackNavigator } from 'react-navigation';

import Categories from '../components/screens/lists/Categories';
import Examples from '../components/screens/lists/Examples';
import Example from '../components/screens/example/Example';

const headerStyles = {
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#00ADEF',
    },
    headerTitleStyle: {
        color: 'white'
    },
    headerBackTitleStyle: {
        backgroundColor: 'white',
        color: 'white'
    },
    headerBackTitle: null
};


const config = {
    routes: {
        categories: {
            screen: Categories,
            navigationOptions: {
                ...headerStyles
            }
        },
        examples: {
            screen: Examples,
            navigationOptions: {
                ...headerStyles
            }
        },
        example: {
            screen: Example,
            navigationOptions: {
                ...headerStyles
            }
        }
    },
    navigator: {}
};

export default StackNavigator(config.routes, config.navigator);