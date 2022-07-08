import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS';

type InitialStateType = {
    userId: number| null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //если 0, каптча не обязательна
};

function authReducer(state = initialState, action: any): InitialStateType {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: 
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let data = await authAPI.getAuthMe();
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    };
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let data = await authAPI.postAuthLogin(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let messageError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: messageError}));
        }
    };
}
export const logout = () => {
    return async (dispatch: any) => {
        let data = await authAPI.deleteAuthLogout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    };
}
export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let data = await securityAPI.getCaptchaUrl();
        let captchaUrl = data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    };
}

export default authReducer;