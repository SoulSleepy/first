import { Field, reduxForm } from "redux-form";
import { Element } from '../../../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../../helpers/validators';
import styleForm from '../../../common/FormControls/FormControls.module.css';
import style from './ProfileInfo.module.css';

const maxLength30 = maxLengthCreator(30);

function ProfileDataForm({profile, handleSubmit, error}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styleForm.formSummaryError}>
                {error}
            </div>}
            <div className={styleForm.formField}>
                <b>Full name:</b> <Field placeholder={'Full name'} name={'fullName'}
                component={Element} elementType='input' validate={[required, maxLength30]}/>
            </div>
            <div className={styleForm.formField}>
                <b>Looking for a job:</b> <Field name={'lookingForAJob'} type={'checkbox'}
                component={Element} elementType='input'/>
            </div>
            <div className={styleForm.formField}>
                <b>My professional skills:</b> <Field placeholder={'My professional skills'}
                name={'lookingForAJobDescription'} component={Element} elementType='textarea'/>
            </div>
            <div className={styleForm.formField}>
                <b>About me:</b> <Field placeholder={'About me'}
                name={'aboutMe'} component={Element} elementType='textarea'/>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={style.contact}>
                        <b>{key}: <Field placeholder={key} name={'contacts.' + key}
                        component={Element} elementType='input'/></b>
                    </div>
                })}
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'edit-profile',
    enableReinitialize: true, 
    destroyOnUnmount: false
}) (ProfileDataForm);
