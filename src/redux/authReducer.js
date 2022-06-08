import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        };
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}
});

export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuthMe();
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    };
}
export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let data = await authAPI.postAuthLogin(email, password, rememberMe);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let messageError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: messageError}));
        }
    };
}
export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.deleteAuthLogout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    };
}

export default authReducer;