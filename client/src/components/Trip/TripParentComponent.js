import React, { Component } from 'react';

import Trip from './Trip';
import TripList from './TripList';

class TripParentComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'tripList',
      selectedTripId: null
    }
  }

  componentDidMount() {
    let { user } = this.props;//user data from Login/Signup
  }

  handleViewChange = (view, selectedTripId) => {
    this.setState({ view, selectedTripId });
  }

  renderView = () => {
    let { selectedTripId, view } = this.state;
    let { trips } = this.props.user;

    return view === 'tripList' ? 
      <TripList
        handleViewChange={ (tripId) => this.handleViewChange('trip', tripId) }
        trips={trips}
      />
      : 
      <Trip
        selectedTripId={ selectedTripId }
      />
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleViewChange('tripList', null)}>All Trips</button>
        {this.renderView()}
      </div>
    )
  }
}

export default TripParentComponent;