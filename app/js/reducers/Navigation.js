import AppNavigator from '../navigation/AppNavigator';

const initialState = AppNavigator.router.getStateForAction('account');

export default function Navigation(state = initialState, action) {
    let { type, payload } = action;
    const nextState = AppNavigator.router.getStateForAction(action, state);

    switch (type) {
        default:
            return nextState || state;
    }
};