import messengerReducer from "./messengerReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

//первый Store написанный вручную для понимания логики работы Store

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 1},
                {id: 2, message: 'It is my first post', likesCount: 2}
            ],
            newPostText: ''
        },
        messengerPage: {
            dialogs: [
                {id: 1, name: 'Yuri'},
                {id: 2, name: 'Alexandra'},
                {id: 3, name: 'Fedor'},
                {id: 4, name: 'Sergei'},
                {id: 5, name: 'Alexey'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Where are you?'},
                {id: 4, message: 'I am fine, Thanks'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: ''
        },
        sidebar: {
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('state changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messengerPage = messengerReducer(this._state.messengerPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state)
    }
}

export default store;

window.store = store;