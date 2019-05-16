import React, { Component } from 'react';

import TripParentComponent from './Trip/TripParentComponent';

class App extends Component {
  render() {
    return (
      <div>
        Hello from App
        <TripParentComponent />
      </div>
    )
  }
}

export default App;