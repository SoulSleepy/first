import { usersAPI, followAPI } from '../api/api';

const FOLLOW_SUCCESS = 'users/FOLLOW-SUCCESS';
const UNFOLLOW_SUCCESS = 'users/UNFOLLOW-SUCCESS';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE-FOLLOWING-IN-PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW_SUCCESS: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user, 
                            followed: true
                        };
                    }
                    return user;
                })
            };
        };
        case UNFOLLOW_SUCCESS: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user, 
                            followed: false
                        };
                    }
                    return user;
                })
            };
        };
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            };
        };
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        };
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        };
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            };
        };
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        };
        default:
            return state;
    }
}



export const followSuccess = (userId) => ({type: FOLLOW_SUCCESS, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW_SUCCESS, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId});


export const requestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.requestUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
}

export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        let data = await followAPI.postFollow(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingInProgress(false, userId));
    };
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        let data = await followAPI.deleteUnfollow(userId);
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingInProgress(false, userId));
    };
}

export default usersReducer;