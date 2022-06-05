import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from "react-router-dom";
import style from './Login.module.css';

function Login(props) {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };
    if (props.isAuth) return <Navigate to='/profile' />;
    return (
        <div className={style.loginBlock}>
            <h2>Authorization</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth
    };
}

export default connect(mapStateToProps, {login}) (Login);