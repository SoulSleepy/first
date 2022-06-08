import{ profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_POST = 'profile/DELETE-POST'; // для теста tdd функционал не реализован в ui

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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id != action.postId)
            }
        } // для теста tdd функционал не реализован в ui
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId}); // для теста tdd функционал не реализован в ui

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    };
}
export const requestUserstatus = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(data));
    };
}
export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let data = await profileAPI.putStatus(status);
        if(data.resultCode == 0) {
            dispatch(setUserStatus(status));
        }
    };
}

export default profileReducer;