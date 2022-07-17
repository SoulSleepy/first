let initialState = {};

export type InitialStateType = typeof initialState;

type ActionTypes = "ActionType | ActionType | ActionType"

function sidebarReducer(state = initialState, action: ActionTypes): InitialStateType {
    return state;
}

export default sidebarReducer;