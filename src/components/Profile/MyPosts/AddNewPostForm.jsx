import { Field, reduxForm } from 'redux-form';
import { Element } from '../../../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../../helpers/validators';

const maxLength300 = maxLengthCreator(300);

function AddNewPostForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Element} elementType='textarea' name='newPostText' placeholder='Enter your post' 
                    validate={[required, maxLength300]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'profileAddNewPostForm'
}) (AddNewPostForm)