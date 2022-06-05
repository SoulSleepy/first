import{ profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It is my first post', likesCount: 2}
    ],
    profile: null,
    status: ''
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST: {
            let text = action.newPostText;
            return {
                ...state,
                posts: [...state.posts, {id:3, message: text, likesCount: 0}]
            };
        };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        };
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        };
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    };
}
export const requestUserstatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(data => {
            dispatch(setUserStatus(data));
        });
    };
}
export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.putStatus(status).then(data => {
            if(data.resultCode == 0) {
                dispatch(setUserStatus(status));
            }
        });
    };
}

export default profileReducer;