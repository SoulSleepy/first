import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType } from "./reduxStore";

const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCES';

export type InitialStateType = {
    initialized: boolean
};

let initialState = {
    initialized: false
};

function appReducer(state = initialState, action: ActionTypes): InitialStateType {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        };
        default:
            return state;
    }
};

type ActionTypes = InitializedSuccessActionType;

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
};

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>; //почему то Promise<void> ругается, на void нет

export const initializeApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        });
    };
}

export default appReducer;