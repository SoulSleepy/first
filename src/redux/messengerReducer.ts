const SEND_MESSAGE = 'messenger/SEND-MESSAGE';

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Yuri'},
        {id: 2, name: 'Alexandra'},
        {id: 3, name: 'Fedor'},
        {id: 4, name: 'Sergei'},
        {id: 5, name: 'Alexey'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Where are you?'},
        {id: 4, message: 'I am fine, Thanks'},
        {id: 5, message: 'Yo'}
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

function messengerReducer(state = initialState, action: any): InitialStateType {
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

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageActionType => ({type: SEND_MESSAGE, newMessageBody});

export default messengerReducer;