import { CHANGE_THEME } from '../constants/Global';

export function changeTheme(themeName) {
    return {
        type: CHANGE_THEME,
        payload: themeName
    };
}