import React, { useReducer } from "react";
import AuthContext from "./context";
import Reducer from "./reducer";
import { LOGIN_USER, LOGOUT_USER, SET_LOADING, SHOW_ALERT, REMOVE_ALERT } from "./types";

const AuthState = ( props ) => {

    const initialState = {
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
        token: JSON.parse(localStorage.getItem("token")) || null,
        loading: false,
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        proxy_url: process.env.REACT_APP_PROXY_URL
    };

    const [ state, dispatch ] = useReducer( Reducer, initialState );

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    };

    const showAlert = (msg, type) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg: msg, type: type }
        });
    
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            })
        }, 3000);
      };

    const loginUser = ( proxy_url, requestData) => {
        setLoading();

        fetch(proxy_url, {
            method: "POST",
            body: JSON.stringify(requestData)
          })
            .then(response => response.json())
            .then(data => {
              dispatch({
                type: LOGIN_USER,
                payload: { currentUser: data.response, isLoggedIn: true, token: data.token }
              });
            })
            .catch(error => {
              showAlert("Login failure!", "danger");
            });
        }
    
        const logoutUser = () => {
            dispatch({
                type: LOGOUT_USER
              });
        }

        return (
            <AuthContext.Provider value={{...state, logoutUser, loginUser, setLoading, showAlert}}>
                {props.children}
            </AuthContext.Provider>
        );
    }

export default AuthState;