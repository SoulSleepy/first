const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Yuri'},
        {id: 2, name: 'Alexandra'},
        {id: 3, name: 'Fedor'},
        {id: 4, name: 'Sergei'},
        {id: 5, name: 'Alexey'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Where are you?'},
        {id: 4, message: 'I am fine, Thanks'},
        {id: 5, message: 'Yo'}
    ]
};

function messengerReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessage = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default messengerReducer;