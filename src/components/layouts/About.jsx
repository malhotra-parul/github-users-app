import React, { useEffect, useContext } from "react";
import GithubContext from "../../context/Github/githubContext";
import Spinner from "./Spinner";
import aboutImage from "../assets/undraw_about_us_page_ee1k.png";

const About = () => {
  const githubContext = useContext(GithubContext);
  const { loading, forks, setForks } = githubContext;
  console.log(forks);

  useEffect(() => {
    setForks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="about">
      <h2 className="h2-about">About section</h2>
      <img src={aboutImage} alt="about us" className="img-about"></img>
      <p>
        This github webapp allows a user to login using his github credentials.
        Once logged in user can check out people who have forked the{" "}
        <strong>
          <a href="https://github.com/facebook/react">React</a>{" "}
        </strong>
        repo by <strong>Facebook.</strong>{" "}
        Currently, I am displaying 200 people out of the total{" "}
        <strong className="text-primary strong">{`${forks}`}</strong> people who
        have forked the repo.
      </p>
     
    </div>
  );
};

export default About;
