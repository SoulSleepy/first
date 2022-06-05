import Messenger from './Messenger';
import {sendMessage} from './../../redux/messengerReducer';
import {connect} from 'react-redux';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';

function mapStateToProps(state) {
    return {
        messengerPage: state.messengerPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessage(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate
) (Messenger);