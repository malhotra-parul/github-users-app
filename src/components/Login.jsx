import React, { useContext, useEffect } from 'react';
import Spinner from "./layouts/Spinner";
import { Redirect } from "react-router-dom";
import GithubContext from "../context/Github/githubContext";

const Login = () => {

    const githubContext = useContext(GithubContext);
    const { isLoggedIn } = githubContext;

    return isLoggedIn ? <Redirect to="/" /> : (
        <div>
            Login
        </div>
    );
}

export default Login;
