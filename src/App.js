import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import GithubState from "./context/Github/GithubState";
import NavBar from "./components/layouts/NavBar";
import Alert from "./components/layouts/Alert";
import About from "./components/layouts/About";
import Footer from "./components/layouts/Footer";
import './App.css';

function App() {
  return ( <GithubState>
            <Router>
             <div className="App">
             <NavBar title="GitHub App" />
             <div className="container">
             <Alert alert={alert} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/about" component={About} />
              </Switch>
            
              </div>
              <Footer />
             </div>
           </Router>
        </ GithubState>
  );
}

export default App;
