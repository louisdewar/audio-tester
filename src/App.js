import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, Quiz } from './pages';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/quiz" component={Quiz} />
        </div>
      </Router>
    );
  }
}

export default App;
