//on load, sends AJAX request to see if sessions is still active, if not, then reject to Login
import React, { Component } from 'react';

import TripParentComponent from './Trip/TripParentComponent';

class AuthHoC extends Component {
  componentDidMount() {
    let { state } = this.props.location;
    if (!state || !state.user) {
      location.push('/login');
    }
  }

  renderView = () => {
    let { state } = this.props.location;

    if (state && state.user) {
      return <TripParentComponent user={state.user}/>
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default AuthHoC;