import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import authReducer from "./authReducer";
import messengerReducer from './messengerReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from "./usersReducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // для redux devtools

let store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware))); // для redux devtools

// let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware)); 

export default store;