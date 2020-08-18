import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
