import React, { useContext, useEffect, Fragment } from 'react';
import Spinner from "./layouts/Spinner";
import GithubContext from "../context/Github/githubContext";
import { Redirect } from "react-router-dom";

const Home = () => {

    const githubContext = useContext(GithubContext);
    const { isLoggedIn, loading } = githubContext;

    if(!isLoggedIn){
        return <Redirect to="/login" />
    }

    return (
       <Fragment>
           Home
       </Fragment>
    )
}

export default Home
