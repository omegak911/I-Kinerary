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

  handleViewChange = (view, selectedTripId) => {
    this.setState({ view, selectedTripId });
  }

  renderView = () => {
    let { selectedTripId, view } = this.state;
    return view === 'tripList' ? 
      <TripList
        handleViewChange={ (tripId) => this.handleViewChange('trip', tripId) }
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