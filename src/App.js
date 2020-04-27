import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Model from './components/Model';
import Visualizations from './components/Visualizations';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/model" component={Model} />
          <Route exact path="/viz" component={Visualizations} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
