import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import { Element } from '../../common/FormControls/FormControls'
import { maxLengthCreator, required } from '../../helpers/validators'
import style from '../../common/FormControls/FormControls.module.css'
import React from 'react'
import { LoginFormValuesType } from './Login'

const maxLength20 = maxLengthCreator(20)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form  className={style.formLoginBlock} onSubmit={props.handleSubmit} >
            <div className={style.formField}>
                <Field placeholder={'Email'} name={'email'} component={Element}
                    elementtype='input' validate={[required, maxLength20]} />
            </div>
            <div className={style.formField}>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={Element}
                    elementtype='input' validate={[required, maxLength20]} />
            </div>
            <div className={style.formCheck}>
                <Field name={'rememberMe'} type={'checkbox'} component={Element}
                    elementtype='input' /> 
            </div><p>remember me</p> 
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <Field placeholder={'Symbols from image'} name={'captcha'} component={Element}
                elementtype='input' validate={[required]}/>}
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div className={style.loginBtn}>
                <button>Login</button>
            </div>
        </form>
    )
}

export default reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
}) (LoginForm)