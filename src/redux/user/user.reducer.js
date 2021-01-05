import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    // Depending on the type of the action
    switch(action.type) {
        // if action is SET_CURRENT_USER then
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                state: action.payload
            }
        // Default return
        default:
            return state;
    }
}

export default userReducer;