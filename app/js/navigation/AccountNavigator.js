import { StackNavigator } from 'react-navigation';

import Login from '../components/screens/login/Login';
import Account from '../components/screens/account/Account';

const headerStyles = {
    headerStyle: {
        backgroundColor: '#00ADEF',
    },
    headerTitleStyle: {
        color: 'white'
    }
};

const config = {
    routes: {
        login: {
            screen: Login,
            navigationOptions: {
                ...headerStyles
            }
        },
        account: {
            screen: Account,
            navigationOptions: {
                ...headerStyles
            }
        }
    },
    navigator: {}
};

export default StackNavigator(config.routes, config.navigator);