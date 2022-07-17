import { Dispatch } from 'redux';
import { FormErrors, stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import{ profileAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { AppStateType } from './reduxStore';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_POST = 'profile/DELETE-POST'; // для теста tdd функционал не реализован в ui
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It is my first post', likesCount: 2}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState;

function profileReducer(state = initialState, action: ActionTypes): InitialStateType {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id:3, message: action.newPostText, likesCount: 0}]
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}

type ActionTypes = AddPostActionType | SetUserProfileActionType
    | SetUserStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status});
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId}); // для теста tdd функционал не реализован в ui
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    };
}
export const requestUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(data));
    };
}
export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.putStatus(status);
        if(data.resultCode == 0) {
            dispatch(setUserStatus(status));
        }
    };
}
export const savePhoto = (file: any): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file);
        if(data.resultCode == 0) {
            dispatch(savePhotoSuccess(data.data.photos));
        }
    };
}
export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => { // недотипизировано, тк ошибка по stopSubmit
        let userId = getState().auth.userId
        let data = await profileAPI.saveProfile(profile);
        if(data.resultCode == 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }
    };
}

export default profileReducer;