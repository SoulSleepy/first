import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCES';

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
//24.09 80 видос 
// Кто не хочет переписывать App.js в класс используйте хук useEffect.
//   useEffect(( ) => {
//     props.initializeApp();
//   }, [ ] )
// убрать из хедера гетюзер дата добавить в апп юз эффект или сделать класс?

export default appReducer;