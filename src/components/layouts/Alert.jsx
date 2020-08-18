import React, { useContext } from "react";
import GithubContext from "../../context/Github/githubContext";

const Alert = ()=>{
    const githubContext = useContext(GithubContext);
    const { alert } = githubContext;
    
    return(
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"/>{alert.msg}
            </div>
        )
    );
};

export default Alert;