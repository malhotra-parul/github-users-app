import React, { useContext, useEffect } from "react";
import Spinner from "./layouts/Spinner";
import { Redirect } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import GithubContext from "../context/Github/githubContext";
import { makeStyles } from "@material-ui/core/styles";

const Login = () => {
  const githubContext = useContext(GithubContext);
  const {
    isLoggedIn,
    loading,
    client_id,
    redirect_uri,
    client_secret,
    proxy_url,
    loginUser
  } = githubContext;

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      const requestData = {
        client_id,
        redirect_uri,
        client_secret,
        code: newUrl[1],
      };
      loginUser( proxy_url, requestData );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoggedIn ? <Redirect to="/" /> : (
    <div className="login-wrapper">
    <h2>Github Users</h2>
    <div className="login-container">
        {
            loading ? (
               <Spinner />
            ) : (
                <a className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}>
                    <GitHubIcon />
                    <span>Login To Github</span>
                </a>
            )
        }
    </div>
</div>
  );
};

export default Login;
