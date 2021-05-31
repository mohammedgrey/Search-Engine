import React from "react";
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home"
import Results from "./components/Results"

function App() {
  return (
    <div className="App">
      
      <Router>
        
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Home/Results/" component={Results}/>
        </Switch> 

      </Router>

    </div>
  );
}

export default App;
