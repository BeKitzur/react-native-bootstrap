import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL,
    GET_AUTHENTICATED_ACCOUNT_START, GET_AUTHENTICATED_ACCOUNT_SUCCESS, GET_AUTHENTICATED_ACCOUNT_FAIL
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
        case LOGIN_START:
            return {
                ...state,
                account: {
                    ...state.account,
                    username: payload.email,
                    password: payload.password
                },
                inProgress: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                inProgress: false,
                error: ''
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: payload,
                inProgress: false
            };

        /* logOut */
        case LOGOUT_START:
            return {
                ...state,
                inProgress: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: false,
                inProgress: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                inProgress: false
            };


        /* getAuthenticatedAccount */
        case GET_AUTHENTICATED_ACCOUNT_START:
            return {
                ...state,
                inProgress: true
            };
        case GET_AUTHENTICATED_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: payload,
                authenticated: true,
                inProgress: false
            };
        case GET_AUTHENTICATED_ACCOUNT_FAIL:
            return {
                ...state,
                account: payload,
                inProgress: false
            };

        default:
            return state;
    }
};
