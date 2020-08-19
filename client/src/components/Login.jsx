import React, { useContext, useEffect } from "react";
import Spinner from "./layouts/Spinner";
import { Redirect } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import GithubContext from "../context/Github/githubContext";
import loginImg from "./assets/undraw_followers_4i0p.png"

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

  if(isLoggedIn){
    return <Redirect to="/" />
  }

  return (
    <div className="about">
    <h2 className="h2-about">Github Users</h2>
    <img src={loginImg} alt="login img" className="img-about"></img>
              <section className="login-container">
                { loading ? <Spinner style={{width: "100px"}}/> :
                <a className="btn display"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}>
                    <span style={{paddingRight: '1em'}}><GitHubIcon /></span>
                    <span>Login To Github</span>
                </a>
}
                </section>
</div>
  )
};

export default Login;
