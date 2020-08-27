import React, { useReducer } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING,
  SHOW_ALERT,
  REMOVE_ALERT,
  SET_FORKS,
  SET_USERS,
  FOLLOW_USER,
  SET_DISABLED
} from "../../types";

//updated env file
const GithubState = (props) => {
  const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false,
    alert: null,
    disabled: false,
    forks: 0,
    users: [],
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const setDisabled = (value) =>{
    dispatch({
      type: SET_DISABLED,
      payload: { disabled: value }
    })
  }

  const showAlert = (msg, type) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { msg: msg, type: type },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      });
    }, 1500);
  };

  const loginUser = (proxy_url, requestData) => {
    setLoading();

    fetch(proxy_url, {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        const { avatar_url,
                bio,
              blog,
              email,
              followers,
              following,
              location,
              name,
              login,
            } = data.response;

        const userDetails = {
          avatar_url,
          bio,
          blog,
          email,
          followers,
          following,
          location,
          name,
          login,
        }
        dispatch({
          type: LOGIN_USER,
          payload: {
            currentUser: userDetails,
            isLoggedIn: true,
            token: data.token,
          },
        });
  
        showAlert("Login successfull!", "success");
      })
      .catch((error) => {
        showAlert("Login failure!", "danger");
      });
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    showAlert("Logged Out!", "success");
  };

  const followUser = async (user) => {
    setDisabled(true);
     await axios.put(`https://api.github.com/user/following/${user}`, {}, {
                     headers: { authorization: `token ${state.token}` }});
      dispatch({
        type: FOLLOW_USER,
      });
      showAlert(`Followed ${user}!`, "success");
      setDisabled(false);
  }

  const fetchUsers = async(itemsPerPage, page) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/repos/facebook/react/forks?per_page=${itemsPerPage}&page=${page}`, 
    { headers: { authorization: `token ${state.token}` } });
    dispatch({
      type: SET_USERS,
      payload: {
        users: response.data
      }
    });
  };

  const setForks = async () => {
    setLoading();
    const res = await axios.get("https://api.github.com/repos/facebook/react", 
    { authorization: `token: ${state.token}`});
    dispatch({
        type: SET_FORKS,
        payload: { forks: res.data.forks_count}
    })
  };

  return (
    <GithubContext.Provider
      value={{ ...state, logoutUser, loginUser, setLoading, showAlert, setForks, fetchUsers, followUser, setDisabled }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
