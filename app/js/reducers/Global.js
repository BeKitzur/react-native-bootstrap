import { CHANGE_THEME } from '../constants/Global';

const initialState = {
    appTheme: 'dark'
};

export default function Global(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case CHANGE_THEME:
            return {
                ...state,
                appTheme: payload
            };

        default:
            return state;
    }
};