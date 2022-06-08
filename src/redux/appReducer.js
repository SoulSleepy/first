import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCES';

let initialState = {
    initialized: false
};

function appReducer(state = initialState, action) {
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
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        });
    };
}

export default appReducer;