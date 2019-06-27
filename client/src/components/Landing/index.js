import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

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

  renderLoginSignUp = () => {
    if (this.state.view === 'login') {
      return <Login toggleView={this.toggleView}/>
    }
    return <Signup toggleView={this.toggleView}/>
  }

  render() {
    return (
      <div>
        <div>
          <h3>Welcome</h3>
          <div>App description/motto</div>
        </div>
        {this.renderLoginSignUp()}
      </div>
    )
  }
}

export default Landing;