import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING,
  SHOW_ALERT,
  REMOVE_ALERT,
  SET_FORKS,
  SET_USERS,
  SET_DISABLED
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("currentUser", JSON.stringify(action.payload.currentUser));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
        loading: false,
      };
    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        token: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SHOW_ALERT:
      return {
        ...state,
        loading: false,
        alert: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
        loading: false,
      };
    case SET_FORKS:
      return {
        ...state,
        forks: action.payload.forks,
        loading: false,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
      }
    case SET_DISABLED:
      return {
        ...state,
        disabled: action.payload.disabled
      }
    default:
      return state;
  }
};
