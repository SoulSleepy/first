import React from 'react';
import style from './Messenger.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import AddMessageForm from './AddMessageForm';

function Messenger(props) {

    let dialogsItems = props.messengerPage.dialogs.map(d => <DialogItem key={d.id} id={d.id}  name={d.name} />);
    let messagesItems = props.messengerPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message} />);

    function addNewMessage(values) {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={style.messenger}>
            <div className={style.dialogsItems}>
                {dialogsItems}
            </div>
            <div className={style.messages}>
                <div>{messagesItems}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Messenger;