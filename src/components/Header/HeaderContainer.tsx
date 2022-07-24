import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'

type PropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

const HeaderContainer: React.FC<PropsType> = (props) => {
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout}) (HeaderContainer)