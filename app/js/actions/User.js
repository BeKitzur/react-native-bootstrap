import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL,
    GET_AUTHENTICATED_ACCOUNT_START, GET_AUTHENTICATED_ACCOUNT_SUCCESS, GET_AUTHENTICATED_ACCOUNT_FAIL
} from '../constants/User';
import appFirebase from '../firebase';
import * as Keychain from 'react-native-keychain';

export function logIn(email, password, onLoginSuccess) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_START,
            payload: { email, password }
        });

        if (!(email && password)) {
            return dispatch({
                type: LOGIN_FAIL,
                payload: 'Please, enter valid email and password'
            });
        }

        appFirebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                Keychain.setGenericPassword(email, password);
                dispatch({ type: LOGIN_SUCCESS });
                onLoginSuccess();
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.message
                });
            });
    };
}

export function logOut(onLogoutSuccess) {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_START
        });

        appFirebase.auth().signOut()
            .then(() => {
                Keychain.resetGenericPassword();
                dispatch({ type: LOGOUT_SUCCESS });
                onLogoutSuccess();
            })
            .catch(err => {
                dispatch({
                    type: LOGOUT_FAIL,
                    payload: err.message
                });
            });
    };
}

export function getAuthenticatedAccount() {
    return async (dispatch) => {
        dispatch({
            type: GET_AUTHENTICATED_ACCOUNT_START
        });

        try {
            let { username, password } = await Keychain.getGenericPassword(),
                user = appFirebase.auth().signInWithEmailAndPassword(username, password);


            if (user) {
                dispatch({
                    type: GET_AUTHENTICATED_ACCOUNT_SUCCESS,
                    payload: { username, password }
                });
            } else {
                throw new Error('Failed to relogin user!');
            }
        }
        catch(err) {
            dispatch({
                type: GET_AUTHENTICATED_ACCOUNT_FAIL,
                payload: err.message
            });
        }
    };
}
