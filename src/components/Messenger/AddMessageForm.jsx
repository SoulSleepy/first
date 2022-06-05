import { Field, reduxForm } from 'redux-form';
import { Element } from '../../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../helpers/validators';

const maxLength100 = maxLengthCreator(100);

function AddMessageForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Element} elementType='textarea' name='newMessageBody' placeholder='Enter your message'
                validate={[required, maxLength100]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'messengerAddMessageForm'
}) (AddMessageForm);