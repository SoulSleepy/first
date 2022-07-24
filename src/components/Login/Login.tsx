import React from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { Navigate } from "react-router-dom"
import style from './Login.module.css'
import { AppStateType } from '../../redux/reduxStore'

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

let Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) return <Navigate to='/profile' />
    return (
        <div className={style.loginBlock}>
            <h2>Authorization</h2>
            <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

function mapStateToProps(state: AppStateType): MapStatePropsType {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login}) (Login)