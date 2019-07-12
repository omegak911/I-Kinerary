import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Landing/index';
import AuthHoC from './AuthHoC';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={AuthHoC} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;