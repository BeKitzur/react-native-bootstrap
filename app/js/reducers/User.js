import {
    SET_USER,
    AUTH_START, AUTH_SUCCESS, AUTH_FAIL,
    CHECK_START, CHECK_SUCCESS, CHECK_FAIL
} from '../constants/User';

const initialState = {
    account: {},
    authenticated: false,
    inProgress: false,
    error: ''
};

export default function User(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {

        /* logIn */
        case AUTH_START:
            return {
                ...state,
                account: {
                    ...state.account,
                    username: payload.email,
                    password: payload.password
                },
                inProgress: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                authenticated: true,
                inProgress: false,
                error: ''
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: payload,
                inProgress: false
            };

        /* getAuthenticatedAccount */
        case CHECK_START:
            return {
                ...state,
                inProgress: true
            };
        case CHECK_SUCCESS:
            return {
                ...state,
                account: payload,
                authenticated: true,
                inProgress: false
            };
        case CHECK_FAIL:
            return {
                ...state,
                account: payload,
                inProgress: false
            };

        default:
            return state;
    }
};
