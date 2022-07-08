let initialState = {};

export type InitialStateType = typeof initialState;

function sidebarReducer(state = initialState, action: any): InitialStateType {
    return state;
}

export default sidebarReducer;