import {
    AUTH_START, AUTH_SUCCESS, AUTH_FAIL,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL,
    CHECK_START, CHECK_SUCCESS, CHECK_FAIL
} from '../constants/User';
import appFirebase from '../firebase';
import * as Keychain from 'react-native-keychain';

export function logIn(email, password, onLoginSuccess) {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_START, payload: { email, password } });

        return appFirebase.auth().signInWithEmailAndPassword(email, password)
            .then(async () => {
                Keychain.setGenericPassword(email, password);

                dispatch({ type: AUTH_SUCCESS });
                onLoginSuccess();
            })
            .catch((err) => {
                dispatch({ type: AUTH_FAIL, payload: err.message });
            });
    };
}

export function logOut(onLogoutSuccess) {
    return (dispatch, getState) => {
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
        dispatch({ type: CHECK_START });

        try {
            let credentials = await Keychain.getGenericPassword();
            dispatch({ type: CHECK_SUCCESS, payload: credentials });
        }
        catch(err) {
            dispatch({ type: CHECK_FAIL, payload: err.message });
        }
    };
}
