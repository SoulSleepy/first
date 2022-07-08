import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCES';

export type InitialStateType = {
    initialized: boolean
};

let initialState = {
    initialized: false
};

function appReducer(state = initialState, action: any): InitialStateType {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
};

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        });
    };
}

export default appReducer;