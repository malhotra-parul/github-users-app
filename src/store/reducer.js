import { LOGIN_USER, LOGOUT_USER, SET_LOADING } from "./types";

export default ( state, action ) => {
    switch(action.type){
        case LOGIN_USER:
            localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
            localStorage.setItem("token", JSON.stringify(action.payload.token))
            localStorage.setItem("currentUser", JSON.stringify(action.payload.user))
            return {
                ...state,
                LoggedIn: action.payload.isLoggedIn,
                currentUser: action.payload.currentUser,
                token: action.payload.token
            };
        case LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                currentUser: action.payload.currentUser,
                token: action.payload.token
            };
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}