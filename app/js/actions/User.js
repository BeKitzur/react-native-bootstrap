import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL,
    GET_AUTHENTICATED_ACCOUNT_START, GET_AUTHENTICATED_ACCOUNT_SUCCESS, GET_AUTHENTICATED_ACCOUNT_FAIL
} from '../constants/User';
import appFirebase from '../firebase';
import * as Keychain from 'react-native-keychain';

export function logIn(email, password, onLoginSuccess) {
    return (dispatch) => {
        dispatch({ type: LOGIN_START, payload: { email, password } });

        return appFirebase.auth().signInWithEmailAndPassword(email, password)
            .then(async () => {
                Keychain.setGenericPassword(email, password);

                dispatch({ type: LOGIN_SUCCESS });
                onLoginSuccess();
            })
            .catch((err) => {
                dispatch({ type: LOGIN_FAIL, payload: err.message });
            });
    };
}

export function logOut(onLogoutSuccess) {
    return (dispatch) => {
        dispatch({ type: LOGOUT_START });

        return appFirebase.auth().signOut()
            .then(() => {
                dispatch({ type: LOGOUT_SUCCESS });
                onLogoutSuccess();
            })
            .catch((err) => dispatch({ type: LOGOUT_FAIL, payload: err }));
    };
}

export function getAuthenticatedAccount() {
    return async (dispatch) => {
        dispatch({ type: GET_AUTHENTICATED_ACCOUNT_START });

        try {
            let credentials = await Keychain.getGenericPassword();
            dispatch({ type: GET_AUTHENTICATED_ACCOUNT_SUCCESS, payload: credentials });
        }
        catch(err) {
            dispatch({ type: GET_AUTHENTICATED_ACCOUNT_FAIL, payload: err.message });
        }
    };
}
