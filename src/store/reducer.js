import { LOGIN_USER, LOGOUT_USER } from "./types";

export default ( state, action ) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                currentUser: action.payload.currentUser,
                token: action.payload.token
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                currentUser: action.payload.currentUser,
                token: action.payload.token
            };
        default: return state;
    }
}