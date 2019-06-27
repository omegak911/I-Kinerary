import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Landing/index';
import TripParentComponent from './Trip/TripParentComponent';

class App extends Component {
  render() {
    return (
      <div>
        Hello from App

        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={TripParentComponent} />
          </Switch>
        </Router>

        {/* <TripParentComponent /> */}
      </div>
    )
  }
}

export default App;