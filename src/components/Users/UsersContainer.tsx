import React from 'react';
import Users from './Users';
import Preloader from '../../common/preloader/Preloader';
import { connect } from 'react-redux';
import {follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUsers} from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from '../../redux/usersSelectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UserType>,
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    requestUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : <Users 
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress} />}
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
}

export default
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUsers})
    (UsersContainer);