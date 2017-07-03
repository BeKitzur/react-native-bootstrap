import AppNavigator from '../navigation/AppNavigator';

const initialState = AppNavigator.router.getStateForAction('login');

export default function Navigation(state = initialState, action) {
    let { type, payload } = action;
    const nextState = AppNavigator.router.getStateForAction(action, state);

    switch (type) {
        case 'SET_INITIAL_ROUTE':
            return payload;

        default:
            return nextState || state;
    }
};
