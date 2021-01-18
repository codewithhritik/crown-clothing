import userActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    // Depending on the type of the action
    switch(action.type) {
        // if action is SET_CURRENT_USER then
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                state: action.payload,
                error: null
            };
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case userActionTypes.SIGN_IN_FAILURE:
        case userActionTypes.SIGN_OUT_FAILURE:
        case userActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        // Default return
        default:
            return state;
    }
}

export default userReducer;