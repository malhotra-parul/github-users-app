import React, { useContext, useEffect, useState } from "react";
import Spinner from "./layouts/Spinner";
import GithubContext from "../context/Github/githubContext";
import { Redirect } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";

const Home = () => {
  const githubContext = useContext(GithubContext);
  const {
    isLoggedIn,
    loading,
    users,
    fetchUsers,
    followUser,
    disabled,
    setLoading,
    currentUser
  } = githubContext;
  const numberOfForks = 200;
  const itemsPerPage = 9;
  const count = Math.ceil(numberOfForks / itemsPerPage);
  const [page, setPage] = useState(1);
  const [currentCard, setCurrentCard] = useState(null);

  const handlePageChange = (value) => {
    setLoading();
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth"});
  };

  useEffect(() => {
    fetchUsers(itemsPerPage, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="about">
      <h2 className="h2-about">Users</h2>
      <h4>Hi, {currentUser.name}!</h4>
      <ul className="grid-3 ">
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id} className="card">
              <img
                src={user.owner.avatar_url}
                alt="usr-img"
                className="card-img"
              />
              <h3 className="card-h1">{user.owner.login}</h3>
              <button
                disabled={disabled}
                className={`card-follow btn-sm ${currentCard === user.owner.login ? "disabled" : ""}`}
                onClick={() => {
                  setCurrentCard(user.owner.login);
                  followUser(user.owner.login);
                }}
              >
                FOLLOW
              </button>
              <a href={`https://github.com/${user.owner.login}`} className="card-repo">
                <button className="repo-btn" >Github Profile</button>
              </a>
            </li>
          ))}
      </ul>
      <div className="pagination">
      <PaginationComponent
        page={page}
        count={count}
        onPageChange={handlePageChange}
      />
      </div>
    </div>
  );
};

export default Home;
