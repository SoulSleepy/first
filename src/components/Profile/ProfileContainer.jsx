import { connect } from 'react-redux';
import { getUserProfile, requestUserstatus, updateUserStatus } from '../../redux/profileReducer';
import { Navigate, useParams } from 'react-router-dom';
import React from 'react';
import Profile from './Profile';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
        };
        this.props.getUserProfile(userId);
        this.props.requestUserstatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    };
}

function TakeParams(props) {
    return <ProfileContainer {...props} params={useParams()} />;
}

export default compose(
    connect(mapStateToProps, {getUserProfile, requestUserstatus, updateUserStatus, withAuthNavigate}),
    withAuthNavigate  // login  светится из за нее
) (TakeParams);