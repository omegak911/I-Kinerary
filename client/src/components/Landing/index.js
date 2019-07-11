import React, { Component } from 'react';

import Authenticate from './Authenticate';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login'
    }
  }

  toggleView = (e) => {
    let view = e.target.name;
    this.setState({ view });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Welcome</h3>
          {/* probably display somethign else here depending on view type */}
          <div>App description/motto</div>
        </div>
        <Authenticate toggleView={this.toggleView} view={this.state.view}/>
      </div>
    )
  }
}

export default Landing;