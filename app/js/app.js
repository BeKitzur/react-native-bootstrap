import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';

const ReactNativeBootstrap = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent('ReactNativeBootstrap', () => ReactNativeBootstrap);

