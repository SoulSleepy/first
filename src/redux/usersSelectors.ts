import { AppStateType } from "./reduxStore";

export function getUsers(state: AppStateType) {
    return state.usersPage.users;
}

export function getPageSize(state: AppStateType) {
    return state.usersPage.pageSize;
}

export function getTotalUsersCount(state: AppStateType) {
    return state.usersPage.totalUsersCount;
}

export function getCurrentPage(state: AppStateType) {
    return state.usersPage.currentPage;
}

export function getIsFetching(state: AppStateType) {
    return state.usersPage.isFetching;
}

export function getFollowingInProgress(state: AppStateType) {
    return state.usersPage.followingInProgress;
}
